"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { TrashIcon } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useLoading } from "@/lib/hooks/loading"
import { useOpen } from "@/lib/hooks/open"
import { useForm } from "react-hook-form"

import type { Store } from "@prisma/client"

type SettingsFormProps = {
    initialData: Store
}

type SettingsFormValues = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(1)
})

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    const { isOpen, setOpen, setClose } = useOpen()
    const { isLoading, setLoading, setLoaded } = useLoading()

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialData
    })

    const onSubmit = async (values: SettingsFormValues) => {
        console.log(values)
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage store preferences" />
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => { }}
                >
                    <TrashIcon className="stroke-[3] size-md" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Store name"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </>
    )
}
