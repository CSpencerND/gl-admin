"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useModalStore } from "@/lib/hooks/use-modal"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { toast } from "react-hot-toast"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Store name must be at least 2 characters.",
    }),
})

export function CreateStoreForm() {
    const closeModal = useModalStore((s) => s.setClose)

    const [isLoading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        try {
            setLoading(true)
            // const response = await axios.post("/api/stores", values)

            const response = await fetch("/api/stores", {
                body: JSON.stringify(values),
                method: "post",
            }).then((r) => r.json())

            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            console.log("[CREATE_FORM_ON_SUBMIT]", error)
            toast.error("Something went wrong :(")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Store Name</FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-input"
                                    disabled={isLoading}
                                    placeholder="Mighty Martian Manager"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Cuz naming things is hard to do</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-x-4 flex items-center justify-end w-full">
                    <Button
                        disabled={isLoading}
                        className=""
                        variant="outline"
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="default"
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