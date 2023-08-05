"use client"

import { ApiCard } from "@/components/api-card"
import { FormEntry } from "@/components/form-entry"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { TrashIcon } from "lucide-react"

import { useToast } from "@/components/ui/use-toast"
import { useLoading } from "@/lib/hooks/loading"
import { useOpen } from "@/lib/hooks/open"
import { useOrigin } from "@/lib/hooks/use-origin"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import axios from "axios"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import type { Store } from "@prisma/client"

type SettingsFormProps = {
    initialData: Store
}

type SettingsFormValues = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(1),
})

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    const { isOpen, setOpen, setClose } = useOpen()
    const { isLoading, setLoading, setLoaded } = useLoading()

    const router = useRouter()
    const origin = useOrigin()
    const storeId = useParams().storeId
    const toast = useToast().toast

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialData,
    })

    const onSubmit = async (values: SettingsFormValues) => {
        try {
            setLoading()
            await axios.patch(`/api/stores/${storeId}`, values)
            router.refresh()
            toast({
                description: "Store Updated",
            })
        } catch (error: unknown) {
            toast({
                description: "Something went wrong :(",
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
                description: "Store Deleted Successfully",
            })
        } catch (error: unknown) {
            toast({
                description: "Make sure you remove all the products and categories first",
            })
        }
    }

    return (
        <>
            <AlertModal
                isOpen={isOpen}
                onClose={setClose}
                onConfirm={onDelete}
                isLoading={isLoading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
                <Button
                    base="soft"
                    variant="destructive"
                    size="icon"
                    disabled={isLoading}
                    onClick={setOpen}
                >
                    <TrashIcon className="stroke-[3] size-sm" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                        <FormEntry
                            control={form.control}
                            name="name"
                            label="Name"
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
            <Separator />
            <ApiCard
                title="NEXT_PUBLIC_API_URL"
                content={`${origin}/api/${storeId}`}
                accessLevel="public"
            />
        </>
    )
}
