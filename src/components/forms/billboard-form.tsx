"use client"

import { FormEntry } from "@/components/forms/form-entry"
import { ImageUpload } from "@/components/forms/image-upload"
import { AlertModal } from "@/components/modals/alert-modal"
import { TrashButton } from "@/components/trash-button"
import { Button } from "@/components/ui/button"
import { SectionDiv } from "@/components/ui/divs"
import { Form } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"

import { useToast } from "@/lib/hooks/use-toast"
import { useLoading } from "@/lib/hooks/use-loading"
import { useOpen } from "@/lib/hooks/use-open"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import * as z from "zod"

import type { BillboardParams } from "@/types"
import type { Billboard } from "@prisma/client"

type BillboardFormProps = {
    initialData: Billboard | null
}

export type BillboardFormValues = z.infer<typeof schema>

const schema = z.object({
    label: z.string().min(1),
    imageKey: z.string(),
})

const ENTITY = "Billboard"
const SEGMENT = "billboards"

export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
    const { setOpen, setClosed, isOpen } = useOpen()
    const { isLoading, setLoading, setLoaded } = useLoading()

    const { storeId, billboardId } = useParams() as BillboardParams["params"]
    const router = useRouter()
    const toast = useToast().toast

    const title = initialData ? `Edit ${ENTITY}` : `Create ${ENTITY}`
    const description = initialData ? `Edit A ${ENTITY}` : `Add A New ${ENTITY}`
    const toastMessage = initialData ? `${ENTITY} Updated` : `${ENTITY} Created`
    const action = initialData ? "Save Changes" : "Create"

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialData ?? { label: "", imageKey: "" },
    })

    const onSubmit = async (values: BillboardFormValues) => {
        console.log(values)

        try {
            setLoading()

            if (initialData) {
                await axios.patch(`/api/${storeId}/${SEGMENT}/${billboardId}`, values)
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

            await axios.delete(`/api/${storeId}/${SEGMENT}/${billboardId}`)

            router.refresh()
            router.push(`/${storeId}/${SEGMENT}`)

            toast({
                title: "Billboard Deleted Successfully",
            })
        } catch (error) {
            toast({
                title: "You must remove all categories associated with this billboard first",
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
                            <div className="flex flex-col gap-8">
                                <ImageUpload
                                    control={form.control}
                                    label="Billboard Image"
                                />
                                <FormEntry
                                    control={form.control}
                                    name="label"
                                    label="Billboard Label"
                                    floating
                                />
                            </div>
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
