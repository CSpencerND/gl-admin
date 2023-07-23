"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useModal } from "@/lib/hooks/use-modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    projectName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export function CreateProjectForm() {
    const closeModal = useModal(s => s.setClose)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                                <Input
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
                        className=""
                        variant="outline"
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Continue</Button>
                </div>
            </form>
        </Form>
    )
}
