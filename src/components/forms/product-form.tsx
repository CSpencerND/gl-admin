"use client"

import { FormEntry, ImageDisplay, ImagePicker, SubmitButton } from "@/components/forms"
import { AlertModal } from "@/components/modals/alert-modal"
import { TrashButton } from "@/components/trash-button"
import { Card } from "@/components/ui/card"
import { SectionDiv } from "@/components/ui/divs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"

import { InfoPopover } from "@/components/info-popover"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useLoading, useOpen, useToast } from "@/lib/hooks"
import { useUploadThing } from "@/lib/uploadthing"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { ControllerRenderProps, useForm } from "react-hook-form"

import { deleteFilesFromServer } from "@/lib/actions/uploadthing"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import * as z from "zod"

import { imageData } from "@/constants"
import { cn, generateFormPageStrings, isBase64Image, readImageFile, validateImageFile } from "@/lib/utils"
import unionBy from "lodash.unionby"

import type { FormProps, ProductParams } from "@/types"
import type { Category, Color, Product, ProductImage, Size } from "@prisma/client"

type TProduct = Product & { images: ProductImage[] }

type ProductFormProps = FormProps<TProduct> & {
    categories: Category[]
    sizes: Size[]
    colors: Color[]
}

export type ProductFormValues = z.infer<typeof schema>

const schema = z.object({
    name: z.string(),
    price: z.coerce.number(),
    categoryId: z.string(),
    colorId: z.string(),
    sizeId: z.string(),
    images: imageData.zod.array(),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
})

export const ProductForm: React.FC<ProductFormProps> = (props) => {
    const { entityName, routeSegment, initialData, categories, sizes, colors } = props

    const [filesAdded, setFilesAdded] = useState<File[]>([])
    const [filesDeleted, setFilesDeleted] = useState<string | string[]>([])

    const defaultValues = {
        name: "",
        images: [imageData.default],
        price: 0,
        categoryId: "",
        colorId: "",
        sizeId: "",
        isFeatured: false,
        isArchived: false,
    }

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialData
            ? { ...initialData, price: parseFloat(String(initialData.price)) }
            : { ...defaultValues },
    })

    const { startUpload } = useUploadThing("multi")

    const { storeId, productId } = useParams() as ProductParams["params"]
    const { refresh, push } = useRouter()

    const { setOpen, setClosed, isOpen } = useOpen()
    const { isLoading, setLoading, setLoaded } = useLoading()
    const { toast } = useToast()

    const formStrings = generateFormPageStrings(!!initialData, entityName)
    const { headingTitle, toastSuccess, submitActionText, headingDescription } = formStrings

    type PBB = ControllerRenderProps<ProductFormValues, "images">

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>, field: PBB) => {
        e.preventDefault()

        if (!e.target.files) return
        const files = Array.from(e.target.files)

        const fieldErrors = files.map((file) => validateImageFile(file))
        const firstError = fieldErrors.find((error) => error !== 0)

        if (firstError) {
            form.setError(field.name, {
                message: firstError,
            })
            throw new Error(firstError)
        }

        form.clearErrors(field.name)
        setFilesAdded((prevFiles) => [...prevFiles, ...files])

        const urlPromises = files.map(async (file) => {
            return (await readImageFile(file)) ?? ""
        })

        const imageDataUrls = await Promise.all(urlPromises)

        if (imageDataUrls) {
            const newImages = imageDataUrls.map((url, i) => {
                return {
                    ...imageData.default,
                    name: files[i].name,
                    url: url,
                }
            })

            const initialImages = field.value
            const mergedImages = unionBy(initialImages, newImages, "name").filter((image) => image.name)

            field.onChange(mergedImages)
        }
    }

    const onRemove = async (url: string, field: PBB) => {
        const currentFieldValue = field.value.find((image) => image.url === url)
        const targetFile = filesAdded.find((file) => file.name === currentFieldValue?.name)

        if (currentFieldValue?.key) {
            setFilesDeleted(currentFieldValue.key)

            toast({
                title: "File queued up for deletion",
                description: "It will be deleted on form submission",
            })
        }

        setFilesAdded((files) => files.filter((file) => file !== targetFile))

        const filteredImages = [...form.getValues().images.filter((current) => current.url !== url)]
        field.onChange(filteredImages)
    }

    const onSubmit = async (values: ProductFormValues) => {
        const dirtyFields = form.formState.dirtyFields
        const areFieldsDirty = Object.values(dirtyFields).some((value) => value)

        if (initialData && !areFieldsDirty) {
            toast({ title: "Nothing has changed", description: "The data is identicle" })
            return
        }

        const isImagesDirty = form.getFieldState("images").isDirty

        if (initialData && !areFieldsDirty && !isImagesDirty) {
            toast({ title: "Nothing has changed", description: "The data is identicle" })
            return
        }

        if (!filesAdded && !filesDeleted) return

        try {
            setLoading()

            const images = values.images

            const haveImagesChanged = images.map((image) => {
                const blob = image.url
                return isBase64Image(blob)
            })

            const changedImages = images.filter((_, index) => haveImagesChanged[index])

            if (changedImages && changedImages.length > 0) {
                const uploadthingRes = await startUpload(filesAdded)

                if (uploadthingRes) {
                    const mergedImages = unionBy([...uploadthingRes, ...values.images], "name")
                    values.images = mergedImages
                }
            }

            if (initialData) {
                if (filesDeleted && filesDeleted.length > 0) {
                    await deleteFilesFromServer(filesDeleted)
                }
                await axios.patch(`/api/${storeId}/${routeSegment}/${productId}`, values)
            } else {
                await axios.post(`/api/${storeId}/${routeSegment}`, values)
            }

            refresh()
            toast({
                title: toastSuccess,
            })
            push(`/${storeId}/${routeSegment}`)
        } catch (error) {
            toast({
                title: "Something went wrong :(",
                description: `${error}`,
            })
        } finally {
            setLoaded()
        }
    }

    const onDelete = async () => {
        try {
            const keys = form.getValues().images.map((image) => image.key)

            if (keys && keys.length > 0) {
                setLoading()

                await axios.delete(`/api/${storeId}/${routeSegment}/${productId}`)
                await deleteFilesFromServer(keys)

                refresh()
                push(`/${storeId}/${routeSegment}`)

                toast({ title: `${entityName} Deleted Successfully` })
            }
        } catch (error) {
            toast({
                title: "Something went wrong :(",
                description: `${error}`,
            })
        } finally {
            setLoaded()
            setClosed()
        }
    }

    return (
        <>
            <AlertModal
                isOpen={isOpen}
                onClose={setClosed}
                onConfirm={onDelete}
                isLoading={isLoading}
            />
            <SectionDiv>
                <div className="flex items-center justify-between pl-2">
                    <Heading
                        title={headingTitle}
                        description={headingDescription}
                    />
                    {initialData ? (
                        <TrashButton
                            disabled={isLoading}
                            onClick={setOpen}
                            className="self-start"
                        />
                    ) : null}
                </div>
                <Card>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="images"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="ml-3 font-semibold text-sm text-muted-foreground">
                                                Product Images
                                            </FormLabel>
                                            <ImageDisplay imageUrls={field.value?.map((value) => value?.url)}>
                                                {(url) => (
                                                    <TrashButton
                                                        disabled={isLoading}
                                                        onClick={() => onRemove(url, field)}
                                                    />
                                                )}
                                            </ImageDisplay>
                                            <FormControl>
                                                <ImagePicker.Multi
                                                    hasValue={!!field.value}
                                                    handleChange={(e) => onChange(e, field)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
                                <FormEntry
                                    control={form.control}
                                    name="name"
                                    label="Product Name"
                                    type="text"
                                />
                                <FormEntry
                                    control={form.control}
                                    name="price"
                                    label="Price"
                                    type="number"
                                />
                                <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <Select
                                                disabled={isLoading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <FormLabel className="ml-3">Category</FormLabel>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            defaultValue={field.value}
                                                            placeholder="Select A Category"
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-lg">
                                                    {categories.map((category, i) => (
                                                        <SelectItem
                                                            key={i}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sizeId"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <Select
                                                disabled={isLoading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <FormLabel className="ml-3">Size</FormLabel>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            defaultValue={field.value}
                                                            placeholder="Select A Size"
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-lg">
                                                    {sizes.map((size, i) => (
                                                        <SelectItem
                                                            key={i}
                                                            value={size.id}
                                                        >
                                                            {size.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="colorId"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <Select
                                                disabled={isLoading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <FormLabel className="ml-3">Color</FormLabel>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            defaultValue={field.value}
                                                            placeholder="Select A Color"
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-lg">
                                                    {colors.map((color, i) => (
                                                        <SelectItem
                                                            key={i}
                                                            value={color.id}
                                                        >
                                                            {color.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-4 max-sm:gap-y-8 sm:grid-cols-2 md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="isFeatured"
                                    render={({ field }) => (
                                        <FormItem className="bg-background max-h-10 flex flex-row items-center justify-between rounded-md border border-input text-muted-foreground h-12">
                                            <FormControl>
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="icon"
                                                    type="button"
                                                >
                                                    <label className="cursor-pointer">
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            className="border-none ring-1 ring-muted-foreground"
                                                        />
                                                    </label>
                                                </Button>
                                            </FormControl>
                                            <FormLabel className="font-semibold text-base !mb-2 !cursor-pointer">
                                                Featured
                                            </FormLabel>
                                            <InfoPopover className="!mb-1.5 ml-auto">
                                                <p>This product will appear on the landing page</p>
                                            </InfoPopover>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isArchived"
                                    render={({ field }) => (
                                        <FormItem className="bg-background max-h-10 flex flex-row items-center justify-between rounded-md border border-input text-muted-foreground h-12">
                                            <FormControl>
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="icon"
                                                    type="button"
                                                >
                                                    <label className="cursor-pointer">
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            className="border-none ring-1 ring-muted-foreground"
                                                        />
                                                    </label>
                                                </Button>
                                            </FormControl>
                                            <FormLabel className="font-semibold text-base !mb-2 !cursor-pointer">
                                                Archived
                                            </FormLabel>
                                            <InfoPopover className="!mb-1.5 ml-auto">
                                                <p>This product will not appear anywhere in the store</p>
                                            </InfoPopover>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex w-full justify-end max-sm:justify-center max-sm:grid max-sm:place-items-center">
                                <SubmitButton
                                    isSubmitting={isLoading}
                                    submitActionText={submitActionText}
                                />
                            </div>
                        </form>
                    </Form>
                </Card>
            </SectionDiv>
        </>
    )
}
