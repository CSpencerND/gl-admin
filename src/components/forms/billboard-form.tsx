"use client"

import { AlertModal } from "@/components/modals/alert-modal"
import { TrashButton } from "@/components/trash-button"
import { SectionDiv } from "@/components/ui/divs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { FormEntry, ImageDisplay, ImagePicker, SubmitButton } from "."

import { useLoading, useOpen, useToast } from "@/lib/hooks"
import { useUploadThing } from "@/lib/uploadthing"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, useFormState } from "react-hook-form"

import { deleteFromUploadthing } from "@/lib/actions/uploadthing"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { isBase64Image } from "@/lib/utils"
import axios from "axios"

import type { BillboardParams } from "@/types"
import type { Billboard } from "@prisma/client"

type BillboardFormProps = {
    initialData: Billboard | null
    entityName: string
    routeSegment: string
}

export type BillboardFormValues = z.infer<typeof schema>

const schema = z.object({
    label: z.string().min(1),
    source: z.object({
        name: z.string(),
        size: z.number(),
        key: z.string(),
        url: z.string(),
    }),
})

export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData, entityName, routeSegment }) => {
    const [files, setFiles] = useState<File[]>([])

    const defaultSource = {
        name: "",
        size: 0,
        key: "",
        url: "",
    }

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialData ?? {
            label: "",
            source: defaultSource,
        },
    })

    const { isSubmitting } = useFormState({ control: form.control })
    const { startUpload } = useUploadThing("single")

    const { storeId, billboardId } = useParams() as BillboardParams["params"]
    const { refresh, push } = useRouter()

    const { setOpen, setClosed, isOpen } = useOpen()
    const { isLoading, setLoading, setLoaded } = useLoading()
    const { toast } = useToast()

    const headingTitle = initialData ? `Edit ${entityName}` : `Create ${entityName}`
    const headingDescription = initialData ? `Manage a ${entityName} for your store` : `Add A New ${entityName}`
    const submitActionText = initialData ? "Save Changes" : "Confirm"

    const toastSuccess = initialData ? `${entityName} Updated` : `${entityName} Created`
    const toastError = "You must remove all categories associated with this billboard first"

    const removeFiles = async (fileKey: string) => {
        setFiles([])
        form.resetField("source")

        if (fileKey) {
            await deleteFromUploadthing(fileKey)
        }

        form.setValue("source", defaultSource)
    }

    const onSubmit = async (values: BillboardFormValues) => {
        if (!files) return

        const blob = values.source.url
        const hasImageChanged = isBase64Image(blob)

        if (hasImageChanged) {
            const uploadthingRes = await startUpload(files)

            if (uploadthingRes) {
                const { key, url, name, size } = uploadthingRes[0]
                values.source = { key, url, name, size }
            }
        }

        try {
            if (initialData) {
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
        }
    }

    const onDelete = async () => {
        try {
            setLoading()

            await axios.delete(`/api/${storeId}/${routeSegment}/${billboardId}`)

            refresh()
            push(`/${storeId}/${routeSegment}`)
            toast({ title: `${entityName} Deleted Successfully` })
        } catch (error) {
            toast({
                title: toastError,
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
                            name="source"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-3 font-semibold text-sm text-muted-foreground">
                                        Billboard Image
                                    </FormLabel>
                                    <ImageDisplay
                                        images={[field.value.url]}
                                        onRemove={() => removeFiles(field.value.key)}
                                    />
                                    <FormControl>
                                        <ImagePicker
                                            setFiles={setFiles}
                                            form={form}
                                            field={field}
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
                                isSubmitting={isSubmitting}
                                submitActionText={submitActionText}
                            />
                        </div>
                    </form>
                </Form>
            </SectionDiv>
        </>
    )
}
