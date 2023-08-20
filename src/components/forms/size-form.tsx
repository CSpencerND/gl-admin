"use client"

import { FormEntry } from "@/components/forms/form-entry"
import { AlertModal } from "@/components/modals/alert-modal"
import { TrashButton } from "@/components/trash-button"
import { Button } from "@/components/ui/button"
import { SectionDiv } from "@/components/ui/divs"
import { Form } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"

import { useLoading } from "@/lib/hooks/use-loading"
import { useOpen } from "@/lib/hooks/use-open"
import { useToast } from "@/lib/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import * as z from "zod"

import type { SizeParams } from "@/types"
import type { Size } from "@prisma/client"

type SizeFormProps = {
    initialData: Size | null
}

export type SizeFormValues = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(1),
    value: z.string().min(1).max(2),
})

const ENTITY = "Size"
const SEGMENT = "sizes"

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
    const { setOpen, setClosed, isOpen } = useOpen()
    const { isLoading, setLoading, setLoaded } = useLoading()

    const { storeId, sizeId } = useParams() as SizeParams["params"]
    const router = useRouter()
    const toast = useToast().toast

    const title = initialData ? `Edit ${ENTITY}` : `Create ${ENTITY}`
    const description = initialData ? `Manage a ${ENTITY} for your store` : `Add A New ${ENTITY}`
    const toastMessage = initialData ? `${ENTITY} Updated` : `${ENTITY} Created`
    const action = initialData ? "Save Changes" : "Create"

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialData ?? { name: "", value: "" },
    })

    const onSubmit = async (values: SizeFormValues) => {
        console.log(values)

        try {
            setLoading()

            if (initialData) {
                await axios.patch(`/api/${storeId}/${SEGMENT}/${sizeId}`, values)
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

            await axios.delete(`/api/${storeId}/${SEGMENT}/${sizeId}`)

            router.refresh()
            router.push(`/${storeId}/${SEGMENT}`)

            toast({
                title: `${ENTITY} Deleted Successfully`,
            })
        } catch (error) {
            toast({
                title: "You must remove all products associated with this size first",
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
                                label="Size Name"
                                floating
                            />
                            <FormEntry
                                control={form.control}
                                name="value"
                                label="Size Value"
                                floating
                            />
                            {/* </div> */}
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
