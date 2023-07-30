"use client"

import { FormEntry } from "@/components/form-entry"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { TrashIcon } from "lucide-react"

import { useLoading } from "@/lib/hooks/loading"
import { useOpen } from "@/lib/hooks/open"
import { useForm } from "react-hook-form"

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

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialData,
    })

    const onSubmit = async (values: SettingsFormValues) => {
        console.log(values)
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
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
                    className="w-full space-y-8"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormEntry
                            control={form.control}
                            name="name"
                            label="Name"
                            isLoading={isLoading}
                            floating
                        />
                    </div>
                    <Button variant="secondary">Save Changes</Button>
                </form>
            </Form>
        </>
    )
}
