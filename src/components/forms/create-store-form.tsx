"use client"

import { FormEntry } from "@/components/forms/form-entry"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { useToast } from "@/components/ui/use-toast"
import { useLoading } from "@/lib/hooks/loading"
import { useModalStore } from "@/lib/hooks/use-modal"
import { useForm } from "react-hook-form"

import axios from "axios"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

export type StoreFormValues = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(2),
})

export function CreateStoreForm() {
    const closeModal = useModalStore((s) => s.setClose)
    const { isLoading, setLoading, setLoaded } = useLoading()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof schema>) {
        console.log(values)

        try {
            setLoading()
            const response = await axios.post("/api/stores", values)
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            console.log("[CREATE_FORM_ON_SUBMIT]", error)
            toast({
                title: "Something went wrong :(",
                description: `${error}`,
            })
        } finally {
            setLoaded()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormEntry
                    control={form.control}
                    name="name"
                    label="Store Name"
                    isLoading={isLoading}
                    floating
                />
                <div className="flex w-full items-center justify-end space-x-4">
                    <Button
                        disabled={isLoading}
                        variant="outline"
                        type="button"
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        type="submit"
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </Form>
    )
}
