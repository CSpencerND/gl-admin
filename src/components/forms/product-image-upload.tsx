"use client"

import { TrashButton } from "@/components/trash-button"
import { UploadButton, UploadFileResponse } from "@/lib/uploadthing"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

import { useMounted } from "@/lib/hooks/use-mounted"
import { useLoading } from "@/lib/hooks/use-loading"

import type { ProductFormValues } from "@/types"

type ImageUploadProps = {
    imageUrls: string[]
    disabled?: boolean
    onChange: (imageUrls: ProductFormValues["images"]) => void
    onRemove: (value: string) => void
}

export const ProductImageUpload: React.FC<ImageUploadProps> = (props) => {
    const { imageUrls, disabled, onChange, onRemove } = props
    const { isLoading, setLoading, setLoaded } = useLoading(true)

    const onUpload = (res: UploadFileResponse[]) => {
        const imageUrls = res.map((r) => ({
            url: r.url,
        }))

        onChange(imageUrls)
    }

    useMounted()

    return (
        <div className="space-y-8">
            <ul className="flex items-center gap-4 overflow-scroll w-max">
                {imageUrls.length > 0 ? (
                    imageUrls.map((url, i) => (
                        <li
                            key={i}
                            className="relative w-72 h-72 rounded-lg overflow-hidden"
                        >
                            <span className="z-10 absolute top-2 right-2">
                                <TrashButton
                                    base="default"
                                    onClick={() => onRemove(url)}
                                />
                            </span>
                            <Skeleton
                                hidden={!isLoading}
                                className="w-full h-full rounded-lg"
                            />
                            <Image
                                src={url}
                                alt="Image"
                                fill
                                className="object-cover"
                                onLoadingComplete={setLoaded}
                            />
                        </li>
                    ))
                ) : (
                    <div
                        aria-hidden="true"
                        className="w-72 h-72"
                    />
                )}
            </ul>
            <UploadButton
                endpoint="multi"
                onUploadProgress={setLoading}
                onClientUploadComplete={(res) => {
                    if (!res) return
                    onUpload(res)
                }}
                onUploadError={(error) => {
                    console.log("[UPLOADTHING_ERROR]", JSON.stringify(error))
                }}
            />
        </div>
    )
}
