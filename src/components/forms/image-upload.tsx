"use client"

import { TrashButton } from "@/components/trash-button"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UploadButton, urlFromKey } from "@/lib/uploadthing"
import { ImageIcon, ImagePlusIcon } from "lucide-react"
import Image from "next/image"

import { useMounted } from "@/lib/hooks/mounted"

import type { Control } from "react-hook-form"
import { Suspense } from "react"

type ImageControl = Control<
    {
        label: string
        imageKey: string
    },
    any
>

type ImageUploadProps = {
    control: ImageControl
    label: string
}

export const ImageUpload: React.FC<ImageUploadProps> = (props) => {
    const { control, label } = props

    useMounted()

    return (
        <div>
            <FormField
                control={control}
                name="imageKey"
                render={({ field }) => {
                    const fieldValue = field.value ? [field.value] : []

                    return (
                        <>
                            {fieldValue && fieldValue.length > 0 ? (
                                <ul className="mb-4 flex items-center gap-4">
                                    {fieldValue.map((key, i) => (
                                        <li
                                            key={i}
                                            className="relative w-72 h-72 rounded-lg overflow-clip"
                                        >
                                            <div className="z-10 absolute top-2 right-2">
                                                <TrashButton
                                                    base="default"
                                                    onClick={() => field.onChange("")}
                                                />
                                            </div>
                                            <Suspense
                                                fallback={
                                                    <div className="w-full h-full grid place-items-center">
                                                        <p>Loading...</p>
                                                    </div>
                                                }
                                            >
                                                <Image
                                                    src={urlFromKey(key)}
                                                    alt="Billboard Image"
                                                    fill
                                                    // placeholder="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSIyIi8+PHBhdGggZD0ibTIxIDE1LTMuMDg2LTMuMDg2YTIgMiAwIDAgMC0yLjgyOCAwTDYgMjEiLz48L3N2Zz4="
                                                    className="object-cover"
                                                />
                                            </Suspense>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <FormItem>
                                    <FormLabel className="ml-3 font-semibold text-sm text-ring">{label}</FormLabel>
                                    <FormControl>
                                        <UploadButton
                                            endpoint="media"
                                            onClientUploadComplete={(res) => {
                                                if (res) {
                                                    field.onChange(res[0].fileKey)
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        </>
                    )
                }}
            />
        </div>
    )
}
