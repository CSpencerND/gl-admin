"use client"

import { FormEntry } from "@/components/forms/form-entry"
import { AlertModal } from "@/components/modals/alert-modal"
import { TrashButton } from "@/components/trash-button"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SectionDiv } from "@/components/ui/divs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"

import { useLoading } from "@/lib/hooks/use-loading"
import { useOpen } from "@/lib/hooks/use-open"
import { useToast } from "@/lib/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import * as z from "zod"

import type { ColorParams } from "@/types"
import type { Color } from "@prisma/client"

type ColorFormProps = {
    initialData: Color | null
}

export type ColorFormValues = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/, {
        message: "Value must be a valid hex code",
    }),
})

const ENTITY = "Color"
const SEGMENT = "colors"

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
    const { setOpen, setClosed, isOpen } = useOpen()
    const { isLoading, setLoading, setLoaded } = useLoading()

    const { storeId, colorId } = useParams() as ColorParams["params"]
    const router = useRouter()
    const toast = useToast().toast

    const title = initialData ? `Edit ${ENTITY}` : `Create ${ENTITY}`
    const description = initialData ? `Manage a ${ENTITY} for your store` : `Add A New ${ENTITY}`
    const toastMessage = initialData ? `${ENTITY} Updated` : `${ENTITY} Created`
    const action = initialData ? "Save Changes" : "Create"

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialData ?? { name: "", value: "#" },
    })

    const onSubmit = async (values: ColorFormValues) => {
        const dirtyFields = form.formState.dirtyFields
        const areFieldsDirty = Object.values(dirtyFields).some((value) => value)

        if (initialData && !areFieldsDirty) {
            toast({ title: "Nothing has changed", description: "The data is identicle" })
            return
        }

        try {
            setLoading()

            if (initialData) {
                await axios.patch(`/api/${storeId}/${SEGMENT}/${colorId}`, values)
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

            await axios.delete(`/api/${storeId}/${SEGMENT}/${colorId}`)

            router.refresh()
            router.push(`/${storeId}/${SEGMENT}`)

            toast({
                title: `${ENTITY} Deleted Successfully`,
            })
        } catch (error) {
            toast({
                title: "You must remove all products associated with this color first",
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
                <Card>
                    <div className="flex items-center justify-between">
                        <Heading
                            title={title}
                            description={description}
                        />
                        {initialData ? (
                            <TrashButton
                                disabled={isLoading}
                                onClick={setOpen}
                                className="self-start"
                            />
                        ) : null}
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full space-y-8"
                        >
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                                <FormEntry
                                    control={form.control}
                                    name="name"
                                    label="Color Name"
                                />

                                <FormField
                                    control={form.control}
                                    name="value"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="ml-3">Color Value</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center gap-4">
                                                    <Input
                                                        placeholder="Color Value"
                                                        disabled={isLoading}
                                                        {...field}
                                                    />
                                                    <span
                                                        aria-hidden="true"
                                                        className="border p-4 rounded-full"
                                                        style={{ backgroundColor: field.value }}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                </Card>
            </SectionDiv>
        </>
    )
}
