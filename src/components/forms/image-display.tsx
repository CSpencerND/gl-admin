import { Skeleton } from "@/components/ui/skeleton"
import { ImageIcon } from "lucide-react"
import Image from "next/image"

import { useLoading, useMounted } from "@/lib/hooks"

type ImageUploadProps = {
    imageUrls: string[]
    children: React.ReactNode | ((url: string) => React.ReactNode)
}

export const ImageDisplay: React.FC<ImageUploadProps> = ({ imageUrls, children }) => {
    useMounted()

    const { isLoading, setLoaded } = useLoading(true)

    if (imageUrls.length === 0 || imageUrls.every((url) => !url)) {
        return (
            <div
                aria-hidden="true"
                className="w-72 h-72 grid place-items-center border-2 border-input rounded-lg bg-background"
            >
                <ImageIcon className="size-3xl stroke-border" />
            </div>
        )
    }

    return (
        <ul className="flex gap-4 items-center overflow-x-scroll rounded-lg pb-2">
            {imageUrls.map((url, i) => {
                return url ? (
                    <li
                        key={i}
                        className="relative w-72 h-72 rounded-lg overflow-hidden flex-none"
                    >
                        <Skeleton
                            hidden={!isLoading}
                            className="w-full h-full rounded-lg"
                        />
                        <span className="z-10 absolute top-2 right-2">
                            {typeof children === "function" ? children(url) : children}
                        </span>
                        <Image
                            src={url}
                            alt="Image"
                            fill
                            className="object-cover"
                            onLoadingComplete={setLoaded}
                        />
                    </li>
                ) : null
            })}
        </ul>
    )
}
