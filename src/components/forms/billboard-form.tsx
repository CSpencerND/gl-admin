"use client"

import { FormEntry, ImageDisplay, ImagePicker, SubmitButton } from "@/components/forms"
import { AlertModal } from "@/components/modals/alert-modal"
import { TrashButton } from "@/components/trash-button"
import { SectionDiv } from "@/components/ui/divs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"

import { useLoading, useOpen, useToast } from "@/lib/hooks"
import { useUploadThing } from "@/lib/uploadthing"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, type ControllerRenderProps } from "react-hook-form"

import { deleteFilesFromServer } from "@/lib/actions/uploadthing"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import * as z from "zod"

import { generateFormPageStrings, isBase64Image, readImageFile, validateImageFile } from "@/lib/utils"

import type { BillboardParams, FormProps } from "@/types"
import type { Billboard } from "@prisma/client"

type BillboardFormProps = FormProps<Billboard>

export type BillboardFormValues = z.infer<typeof schema>

const schema = z.object({
    label: z.string().min(1),
    url: z.string().min(1, { message: "An image is required" }),
    name: z.string(),
    key: z.string(),
    size: z.number(),
})

const defaultValues = {
    label: "",
    url: "",
    name: "",
    key: "",
    size: 0,
}

export const BillboardForm: React.FC<BillboardFormProps> = (props) => {
    const { initialData, entityName, dependentEntity, routeSegment } = props

    const [filesAdded, setFilesAdded] = useState<File[]>([])
    const [filesDeleted, setFilesDeleted] = useState<string | string[]>([])

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialData ?? defaultValues,
    })

    const { storeId, billboardId } = useParams() as BillboardParams["params"]
    const { refresh, push } = useRouter()

    const { setOpen, setClosed, isOpen } = useOpen()
    const { isLoading, setLoading, setLoaded } = useLoading()
    const { toast } = useToast()

    const formStrings = generateFormPageStrings(!!initialData, entityName, dependentEntity)
    const { toastError, headingTitle, toastSuccess, submitActionText, headingDescription } = formStrings

    const { startUpload } = useUploadThing("single")

    type CBB = ControllerRenderProps<BillboardFormValues, "url">

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>, field: CBB) => {
        e.preventDefault()

        const file = e.target.files?.[0]
        if (!file) return

        const fieldError = validateImageFile(file)
        if (fieldError) {
            form.setError(field.name, {
                message: fieldError,
            })
            throw new Error(fieldError)
        }

        form.clearErrors(field.name)
        setFilesAdded([file])

        const imageDataUrl = (await readImageFile(file)) ?? ""

        if (imageDataUrl) {
            field.onChange(imageDataUrl)
        }
    }

    const onRemove = async () => {
        const { key } = form.getValues()
        if (key) {
            setFilesDeleted(key)

            toast({
                title: "File queued up for deletion",
                description: "It will be deleted on form submission",
            })
        }

        setFilesAdded([])

        form.setValue("url", "")
        form.setValue("key", "")
        form.setValue("name", "")
        form.setValue("size", 0)
    }

    const onSubmit = async (values: BillboardFormValues) => {
        const isFormDirty = form.formState.isDirty

        if (initialData && !isFormDirty) {
            toast({ title: "Nothing has changed", description: "The data is identicle" })
            return
        }

        if (!filesAdded && !filesDeleted) return

        setLoading()

        const hasImageChanged = isBase64Image(values.url)

        if (hasImageChanged) {
            const uploadthingRes = await startUpload(filesAdded)

            if (uploadthingRes) {
                const { label } = values
                values = { label, ...uploadthingRes[0] }
            }
        }

        try {
            if (initialData) {
                if (filesDeleted) {
                    await deleteFilesFromServer(filesDeleted)
                }
                await axios.patch(`/api/${storeId}/${routeSegment}/${billboardId}`, values)
            } else {
                await axios.post(`/api/${storeId}/${routeSegment}`, values)
            }

            refresh()
            toast({ title: toastSuccess })
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
            const { key } = form.getValues()

            if (key) {
                setLoading()

                await deleteFilesFromServer(key)
                await axios.delete(`/api/${storeId}/${routeSegment}/${billboardId}`)

                refresh()
                push(`/${storeId}/${routeSegment}`)

                toast({ title: `${entityName} Deleted Successfully` })
            }
        } catch (error) {
            toast({
                // title: toastError,
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
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-3 font-semibold text-sm text-muted-foreground">
                                        Billboard Image
                                    </FormLabel>
                                    <ImageDisplay imageUrls={[field.value]}>
                                        <TrashButton
                                            disabled={isLoading}
                                            base="default"
                                            onClick={onRemove}
                                        />
                                    </ImageDisplay>
                                    <FormControl>
                                        <ImagePicker.Single
                                            hasValue={!!field.value}
                                            handleChange={(e) => onChange(e, field)}
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
                                label="Billboard Label"
                                floating
                            />
                        </div>
                        <div className="flex w-full max-sm:justify-center max-sm:grid max-sm:place-items-center">
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
