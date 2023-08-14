"use client"

import { TrashButton } from "@/components/trash-button"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { UploadButton, urlFromKey } from "@/lib/uploadthing"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

import { useMounted } from "@/lib/hooks/mounted"
import { useLoading } from "@/lib/hooks/loading"

import type { Control } from "react-hook-form"

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
    const { isLoading, setLoading, setLoaded } = useLoading()

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
                                            <Skeleton hidden={!isLoading} className="w-full h-full rounded-lg" />
                                            <Image
                                                src={urlFromKey(key)}
                                                alt="Billboard Image"
                                                fill
                                                onLoadingComplete={setLoaded}
                                                className="object-cover"
                                            />
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
                                                onUploadProgress={setLoading}
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
