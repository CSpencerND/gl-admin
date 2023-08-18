"use client"

import { FormEntry } from "@/components/forms/form-entry"
import { ProductImageUpload } from "@/components/forms/product-image-upload"
import { AlertModal } from "@/components/modals/alert-modal"
import { TrashButton } from "@/components/trash-button"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { SectionDiv } from "@/components/ui/divs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useLoading } from "@/lib/hooks/use-loading"
import { useOpen } from "@/lib/hooks/use-open"
import { useToast } from "@/lib/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import * as z from "zod"

import { cn } from "@/lib/utils"
import type { ProductParams } from "@/types"
import type { Category, Color, Image, Product, Size } from "@prisma/client"
import { InfoIcon } from "lucide-react"
import { InfoPopover } from "../info-popover"

export type Images = {
    images: Image[]
}

type ProductFormProps = {
    initialData: (Product & Images) | null
    categories: Category[]
    sizes: Size[]
    colors: Color[]
}

export type ProductFormValues = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
})

const ENTITY = "Product"
const SEGMENT = "products"

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, categories, sizes, colors }) => {
    const { setOpen, setClosed, isOpen } = useOpen()
    const { isLoading, setLoading, setLoaded } = useLoading()

    const { storeId, productId } = useParams() as ProductParams["params"]
    const router = useRouter()
    const toast = useToast().toast

    const title = initialData ? `Edit ${ENTITY}` : `Create ${ENTITY}`
    const description = initialData ? `Manage a ${ENTITY} for your store` : `Add A New ${ENTITY}`
    const toastMessage = initialData ? `${ENTITY} Updated` : `${ENTITY} Created`
    const action = initialData ? "Save Changes" : "Create"

    const defaultValues = {
        name: "",
        images: [],
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

    const onSubmit = async (values: ProductFormValues) => {
        console.log(values)

        try {
            setLoading()

            if (initialData) {
                await axios.patch(`/api/${storeId}/${SEGMENT}/${productId}`, values)
            } else {
                await axios.post(`/api/${storeId}/${SEGMENT}`, values)
            }

            router.refresh()
            toast({
                title: toastMessage,
            })
            router.push(`/${storeId}/${SEGMENT}`)
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
            setLoading()

            await axios.delete(`/api/${storeId}/${SEGMENT}/${productId}`)

            router.refresh()
            router.push(`/${storeId}/${SEGMENT}`)

            toast({
                title: `${ENTITY} Deleted Successfully`,
            })
        } catch (error) {
            toast({
                title: "You must remove all categories associated with this product first",
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
                        title={title}
                        description={description}
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-3 font-semibold text-sm text-muted-foreground">
                                        Product Images
                                    </FormLabel>
                                    <FormControl>
                                        <ProductImageUpload
                                            imageUrls={field.value.map((image) => image.url)}
                                            onChange={(newImageUrls) => {
                                                const combinedUrls = [...field.value, ...newImageUrls]
                                                field.onChange(combinedUrls)
                                            }}
                                            onRemove={(url) =>
                                                field.onChange([
                                                    ...field.value.filter((current) => current.url !== url),
                                                ])
                                            }
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                            <FormEntry
                                control={form.control}
                                name="label"
                                label="Product Name"
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
                        <Button
                            disabled={isLoading}
                            type="submit"
                            className="ml-auto"
                        >
                            {action}
                        </Button>
                    </form>
                </Form>
            </SectionDiv>
        </>
    )
}
