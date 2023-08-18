"use client"

import { TrashButton } from "@/components/trash-button"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { UploadButton, urlFromKey } from "@/lib/uploadthing"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

import { useMounted } from "@/lib/hooks/use-mounted"
import { useLoading } from "@/lib/hooks/use-loading"

import type { Control } from "react-hook-form"
import type { BillboardFormValues } from "@/types"

type ImageControl = Control<BillboardFormValues, any>

type ImageUploadProps = {
    control: ImageControl
    label: string
}

export const BillboardImageUpload: React.FC<ImageUploadProps> = (props) => {
    const { control, label } = props
    const { isLoading, setLoading, setLoaded } = useLoading(true)

    useMounted()

    return (
        <div className="w-max">
            <FormField
                control={control}
                name="imageKey"
                render={({ field }) => {
                    const fieldValue = field.value ? [field.value] : []

                    return (
                        <>
                            <FormLabel
                                htmlFor="imageKey"
                                className="ml-3 font-semibold text-sm text-ring"
                            >
                                {label}
                            </FormLabel>
                            {fieldValue && fieldValue.length > 0 ? (
                                <ul className="mb-4 flex items-center gap-4">
                                    {fieldValue.map((key, i) => (
                                        <li
                                            key={i}
                                            className="relative w-72 h-72 rounded-lg overflow-hidden"
                                        >
                                            <div className="z-10 absolute top-2 right-2">
                                                <TrashButton
                                                    base="default"
                                                    onClick={() => field.onChange("")}
                                                />
                                            </div>
                                            <Skeleton
                                                hidden={!isLoading}
                                                className="w-full h-full rounded-lg"
                                            />
                                            <Image
                                                src={urlFromKey(key)}
                                                alt={""}
                                                fill
                                                onLoadingComplete={setLoaded}
                                                className="object-cover"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <>
                                    <div
                                        aria-hidden="true"
                                        className="w-72 h-60"
                                    />
                                    <FormItem>
                                        <FormControl>
                                            <UploadButton
                                                endpoint="single"
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
