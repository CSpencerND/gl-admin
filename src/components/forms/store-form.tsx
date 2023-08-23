"use client"

import { FormEntry } from "@/components/forms/form-entry"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SubmitButton } from "."

import { useLoading, useModalStore, useToast } from "@/lib/hooks"
import { useForm, useFormState } from "react-hook-form"

import axios from "axios"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

export type StoreFormValues = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(2),
})

export function CreateStoreForm() {
    const closeModal = useModalStore((s) => s.setClosed)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
        },
    })

    const { isSubmitting } = useFormState({ control: form.control })

    async function onSubmit(values: z.infer<typeof schema>) {
        console.log(values)

        try {
            const response = await axios.post("/api/stores", values)
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            console.log("[CREATE_FORM_ON_SUBMIT]", error)
            toast({
                title: "Something went wrong :(",
                description: `${error}`,
            })
        } finally {
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormEntry
                    control={form.control}
                    name="name"
                    label="Store Name"
                    isLoading={isSubmitting}
                    floating
                />
                <div className="flex w-full items-center justify-end space-x-4 mt-8">
                    <Button
                        disabled={isSubmitting}
                        variant="outline"
                        type="button"
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <SubmitButton
                        isSubmitting={isSubmitting}
                        submitActionText="Confirm"
                    />
                </div>
            </form>
        </Form>
    )
}
