"use client"

import { TrashButton } from "@/components/trash-button"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { UploadButton, urlFromKey } from "@/lib/uploadthing"
import Image from "next/image"

import { PLACEHOLDER } from "@/constants"

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
                                                    placeholder={PLACEHOLDER}
                                                    // placeholder="blur"
                                                    // blurDataURL="data:image/webp;base64,UklGRgACAABXRUJQVlA4IPQBAAAQIwCdASoDAQMBPpFIoUulpCOhpHGosLASCWlu4XMxxj8zxYavNFWpp0EEkyQy9L4bzm2opVGbailUZtqKVRm2opTYbJSn9YzN+N0EEkyQy0Wuwg03EIT+hsAlZ2UMDTS5La3+hl4xSVMg7NX74mUMAbL8YqBKSfex97fHG2oo/0qmRsnzvjWRnei52p5pFpy6CCSSp4SPE/ozTqgyrUxbvomHcQjvZWbUUqfoG44GSgDuG6UBPIgLu/YdnOVm1FKn6BtBs0ARDy/qqVwdleeTcybVm1FKn576BLdkTvj4jJY/zxc7zjrSmn+tztoCt1kcPWxcMD8QQSTYxl421FKozbUUqjNtRSqM21FKozbUUqjNtRSqM21FKozbUUqjNsyAAP797KDoCK1mjirrT9OQGytzZkLB3CQLwxGGzETgjoSyh+6ikrwJNMk4QBniXrmG4o20qc7iDz01pKWvWrhWhXU6+4HPAtKzKasUkutBayGDvqs9faXMfG9IYGles+m/LjdLdqBKr2V4d8RrmhR+sN9crXjhSwI5dCQkV+Ror2PVm4VWqEeIhqH4ThHy6nxAvnI1/bFmRCrZPuoEFASNjZQxJ6DW1HF3z/Y/c9G1dCcCsndgdKISWXsfcQrVWEB4WA2ZKdnB5A6x3APjj6Y+OOAAAA=="
                                                    // placeholder="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSIyIi8+PHBhdGggZD0ibTIxIDE1LTMuMDg2LTMuMDg2YTIgMiAwIDAgMC0yLjgyOCAwTDYgMjEiLz48L3N2Zz4="
                                                    className="object-cover"
                                                />
                                            </Suspense>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <>
                                    <FormItem>
                                        <FormLabel className="ml-3 font-semibold text-sm text-ring">{label}</FormLabel>
                                        <FormControl>
                                            <UploadButton
                                                endpoint="media"
                                                onClientUploadComplete={(res) => {
                                                    if (res) {
                                                        console.log(res[0])
                                                        field.onChange(res[0].key)
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                </>
                            )}
                        </>
                    )
                }}
            />
        </div>
    )
}
