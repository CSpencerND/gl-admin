"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useToast } from "@/components/ui/use-toast"
import { useLoading } from "@/lib/hooks/loading"
import { useModalStore } from "@/lib/hooks/use-modal"
import { useForm } from "react-hook-form"

import axios from "axios"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Store name must be at least 2 characters.",
    }),
})

export function CreateStoreForm() {
    const closeModal = useModalStore((s) => s.setClose)
    const { isLoading, setLoading, setLoaded } = useLoading()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        try {
            setLoading()
            const response = await axios.post("/api/stores", values)
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            console.log("[CREATE_FORM_ON_SUBMIT]", error)
            toast({
                description: "Something went wrong :(",
            })
        } finally {
            setLoaded()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Store Name</FormLabel>
                            <FormControl>
                                <Input
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
                <div className="flex w-full items-center justify-end space-x-4">
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
