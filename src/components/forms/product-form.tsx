"use client"

import { FormEntry, ImageDisplay, ImagePicker, SubmitButton } from "@/components/forms"
import { AlertModal } from "@/components/modals/alert-modal"
import { TrashButton } from "@/components/trash-button"
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

import { imageSource } from "@/constants"
import { cn, generateFormPageStrings, isBase64Image } from "@/lib/utils"

import type { FormProps, ProductParams } from "@/types"
import type { Category, Color, Image, Product, Size } from "@prisma/client"

type TProduct = Product & { images: Image[] }

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
    images: imageSource.zod.array(),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
})

export const ProductForm: React.FC<ProductFormProps> = (props) => {
    const { entityName, routeSegment, initialData, categories, sizes, colors } = props

    const [files, setFiles] = useState<File[]>([])

    const defaultValues = {
        name: "",
        images: [imageSource.default],
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

    const removeFile = async (url: string, field: ControllerRenderProps<ProductFormValues, "images">) => {
        /** WARN: Ideally, the image deletion from uploadthing would only be queued up from here,
         *  and the actual deletion would occur on form submission
         */

        setFiles((files) => files.filter((file) => !url.includes(file.name)))

        const fileKey = form.getValues().images.find((image) => image.url === url)?.key

        if (fileKey) {
            setLoading()
            await deleteFilesFromServer(fileKey)
            setLoaded()
        }

        field.onChange([...field.value.filter((current) => current.url !== url)])

        if (field.value.length === 0) {
            setFiles([])
            form.resetField("images")
            form.setValue("images", [imageSource.default])
        }
    }

    const onSubmit = async (values: ProductFormValues) => {
        if (!files) return

        setLoading()

        const images = values.images

        const haveImagesChanged = images.map((image) => {
            const blob = image.url
            return isBase64Image(blob)
        })

        const changedImages = images.filter((_, index) => haveImagesChanged[index])

        if (changedImages.length > 0) {
            const uploadthingRes = await startUpload(files)

            if (uploadthingRes) {
                const filteredRes = uploadthingRes.map((image) => {
                    const { key, url, name, size } = image
                    return {
                        key,
                        url,
                        name,
                        size,
                    }
                })
                values.images = filteredRes
            }
        }

        try {
            if (initialData) {
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
            // if (changedImages.length === 0) {
            //     toast({ title: "Nothing has changed", description: "The data is identicle" })
            //     setLoaded()
            // } else {
            console.log(JSON.stringify(error, null, 4))
            toast({
                title: "Something went wrong :(",
                description: `${error}`,
            })
            // }
        } finally {
            setLoaded()
        }
    }

    const onDelete = async () => {
        try {
            setLoading()

            const fileKeys = form.getValues().images.map((image) => image.key)

            if (fileKeys.length > 0) {
                await axios.delete(`/api/${storeId}/${routeSegment}/${productId}`)
                await deleteFilesFromServer(fileKeys)

                refresh()
                push(`/${storeId}/${routeSegment}`)

                toast({
                    title: `${entityName} Deleted Successfully`,
                })
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
                <div className="flex items-center justify-between">
                    <Heading
                        title={headingTitle}
                        description={headingDescription}
                    />
                    {initialData ? (
                        <TrashButton
                            disabled={isLoading}
                            onClick={setOpen}
                        />
                    ) : null}
                </div>
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
                                                    base="default"
                                                    onClick={() => removeFile(url, field)}
                                                />
                                            )}
                                        </ImageDisplay>
                                        <FormControl>
                                            <ImagePicker.Multi
                                                field={field}
                                                form={form}
                                                setFiles={setFiles}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                            <FormEntry
                                control={form.control}
                                name="name"
                                label="Product Name"
                                type="text"
                                floating
                            />
                            <FormEntry
                                control={form.control}
                                name="price"
                                label="Price"
                                type="number"
                                floating
                            />
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem className="relative my-1">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-12">
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                        placeholder="Select A Category"
                                                        className="!placeholder-transparent !peer"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category, i) => (
                                                    <SelectItem
                                                        key={i}
                                                        value={category.id}
                                                        className="h-12"
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        <FormLabel
                                            className={cn(
                                                "absolute -top-5 left-0 ml-1.5 bg-background px-1.5 text-sm font-semibold text-muted-foreground transition-all",
                                                "peer-placeholder-shown:top-1 peer-placeholder-shown:text-base",
                                                "peer-focus:-top-5 peer-focus:text-sm peer-focus:text-ring"
                                            )}
                                        >
                                            Category
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sizeId"
                                render={({ field }) => (
                                    <FormItem className="relative my-1">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-12">
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                        placeholder="Select A Size"
                                                        className="!placeholder-transparent !peer"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {sizes.map((size, i) => (
                                                    <SelectItem
                                                        key={i}
                                                        value={size.id}
                                                        className="h-12"
                                                    >
                                                        {size.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        <FormLabel
                                            className={cn(
                                                "absolute -top-5 left-0 ml-1.5 bg-background px-1.5 text-sm font-semibold text-muted-foreground transition-all",
                                                "peer-placeholder-shown:top-1 peer-placeholder-shown:text-base",
                                                "peer-focus:-top-5 peer-focus:text-sm peer-focus:text-ring"
                                            )}
                                        >
                                            Size
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="colorId"
                                render={({ field }) => (
                                    <FormItem className="relative my-1">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-12">
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                        placeholder="Select A Color"
                                                        className="!placeholder-transparent !peer"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {colors.map((color, i) => (
                                                    <SelectItem
                                                        key={i}
                                                        value={color.id}
                                                        className="h-12"
                                                    >
                                                        {color.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        <FormLabel
                                            className={cn(
                                                "absolute -top-5 left-0 ml-1.5 bg-background px-1.5 text-sm font-semibold text-muted-foreground transition-all",
                                                "peer-placeholder-shown:top-1 peer-placeholder-shown:text-base",
                                                "peer-focus:-top-5 peer-focus:text-sm peer-focus:text-ring"
                                            )}
                                        >
                                            Color
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                            <FormField
                                control={form.control}
                                name="isFeatured"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-md border border-input text-muted-foreground h-12">
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
                                        <FormLabel className=" font-semibold text-base !mb-2 !cursor-pointer">
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
                                    <FormItem className="flex flex-row items-center justify-between rounded-md border border-input text-muted-foreground h-12">
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
                                        <FormLabel className=" font-semibold text-base !mb-2 !cursor-pointer">
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
            </SectionDiv>
        </>
    )
}
