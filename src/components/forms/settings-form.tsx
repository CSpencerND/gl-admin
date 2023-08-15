"use client"

import { ApiCard } from "@/components/api-card"
import { FormEntry } from "@/components/forms/form-entry"
import { AlertModal } from "@/components/modals/alert-modal"
import { TrashButton } from "@/components/trash-button"
import { Button } from "@/components/ui/button"
import { SectionDiv } from "@/components/ui/divs"
import { Form } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"

import { useToast } from "@/components/ui/use-toast"
import { useLoading } from "@/lib/hooks/loading"
import { useOpen } from "@/lib/hooks/open"
import { useOrigin } from "@/lib/hooks/use-origin"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import axios from "axios"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import type { StoreParams } from "@/types"
import type { Store } from "@prisma/client"

type SettingsFormProps = {
    initialData: Store
}

export type StoreFormValues = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(2),
})

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    const { isOpen, setOpen, setClosed } = useOpen()
    const { isLoading, setLoading, setLoaded } = useLoading()

    const { storeId } = useParams() as StoreParams["params"]
    const router = useRouter()
    const origin = useOrigin()
    const toast = useToast().toast

    const form = useForm<StoreFormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialData,
    })

    const onSubmit = async (values: StoreFormValues) => {
        try {
            setLoading()
            await axios.patch(`/api/stores/${storeId}`, values)
            router.refresh()
            toast({
                title: "Store Updated",
            })
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
            await axios.delete(`/api/stores/${storeId}`)
            router.refresh()
            router.push("/")
            toast({
                title: "Store Deleted Successfully",
            })
        } catch (error: unknown) {
            toast({
                title: "You must remove all the products and categories first",
            })
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
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
                {initialData ? (
                    <TrashButton
                        disabled={isLoading}
                        onClick={setOpen}
                    />
                ) : null}
            </div>
            <SectionDiv>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-8"
                    >
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                            <FormEntry
                                control={form.control}
                                name="name"
                                label="Store Name"
                                isLoading={isLoading}
                                floating
                            />
                        </div>
                        <Button
                            // variant="secondary"
                            disabled={isLoading}
                            type="submit"
                            className="ml-auto"
                        >
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </SectionDiv>
            <SectionDiv>
                <ApiCard
                    title="NEXT_PUBLIC_API_URL"
                    content={`${origin}/api/${storeId}`}
                    accessLevel="public"
                />
            </SectionDiv>
        </>
    )
}
