import { TrashButton } from "@/components/trash-button"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageIcon } from "lucide-react"
import Image from "next/image"

import { useLoading } from "@/lib/hooks/use-loading"
import { useMounted } from "@/lib/hooks/use-mounted"

type ImageUploadProps = {
    onRemove: () => void
    images: string[]
}

export const ImageDisplay: React.FC<ImageUploadProps> = ({ images, onRemove }) => {
    const { isLoading, setLoaded } = useLoading(true)

    useMounted()

    return (
        <ul className="space-y-8">
            {images.map((image, i) =>
                image ? (
                    <li
                        key={i}
                        className="relative w-72 h-72 rounded-lg overflow-hidden"
                    >
                        <Skeleton
                            hidden={!isLoading}
                            className="w-full h-full rounded-lg"
                        />
                        <span className="z-10 absolute top-2 right-2">
                            <TrashButton
                                base="default"
                                onClick={onRemove}
                            />
                        </span>
                        <Image
                            src={image}
                            alt="Selected Image"
                            fill
                            className="object-cover"
                            onLoadingComplete={setLoaded}
                        />
                    </li>
                ) : (
                    <div
                        key={i}
                        aria-hidden="true"
                        className="w-72 h-72 grid place-items-center ring-1 ring-input rounded-lg"
                    >
                        <ImageIcon className="size-3xl stroke-border" />
                    </div>
                )
            )}
        </ul>
    )
}
