"use client"

import { FormEntry } from "@/components/forms/form-entry"
import { AlertModal } from "@/components/modals/alert-modal"
import { TrashButton } from "@/components/trash-button"
import { Button } from "@/components/ui/button"
import { SectionDiv } from "@/components/ui/divs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
import type { CategoryParams } from "@/types"
import type { Banner, Category } from "@prisma/client"

type CategoryFormProps = {
    initialData: Category | null
    banners: Banner[]
}

export type CategoryFormValues = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(1),
    bannerId: z.string(),
})

const ENTITY = "Category"
const SEGMENT = "categories"

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, banners }) => {
    const { setOpen, setClosed, isOpen } = useOpen()
    const { isLoading, setLoading, setLoaded } = useLoading()

    const { storeId, categoryId } = useParams() as CategoryParams["params"]
    const router = useRouter()
    const toast = useToast().toast

    const title = initialData ? `Edit ${ENTITY}` : `Create ${ENTITY}`
    const description = initialData ? `Manage a ${ENTITY} for your store` : `Add A New ${ENTITY}`
    const toastMessage = initialData ? `${ENTITY} Updated` : `${ENTITY} Created`
    const action = initialData ? "Save Changes" : "Create"

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialData ?? { name: "", bannerId: "" },
    })

    const onSubmit = async (values: CategoryFormValues) => {
        const isFormDirty = form.formState.isDirty

        if (initialData && !isFormDirty) {
            toast({ title: "Nothing has changed", description: "The data is identicle" })
            return
        }

        try {
            setLoading()

            if (initialData) {
                await axios.patch(`/api/${storeId}/${SEGMENT}/${categoryId}`, values)
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

            await axios.delete(`/api/${storeId}/${SEGMENT}/${categoryId}`)

            router.refresh()
            router.push(`/${storeId}/${SEGMENT}`)

            toast({
                title: `${ENTITY} Deleted Successfully`,
            })
        } catch (error) {
            toast({
                title: "You must remove all products associated with this category first",
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
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                            {/* <div className="flex flex-col gap-8"> */}
                            <FormEntry
                                control={form.control}
                                name="name"
                                label="Category Name"
                                floating
                            />
                            <FormField
                                control={form.control}
                                name="bannerId"
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
                                                        placeholder="Select A Banner"
                                                        className="!placeholder-transparent !peer"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {banners.map((banner, i) => (
                                                    <SelectItem
                                                        key={i}
                                                        value={banner.id}
                                                        className="h-12"
                                                    >
                                                        {banner.label}
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
                                            Banner
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* </div> */}
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
