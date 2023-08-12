"use client"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { UploadDropzone, type UploadResponse } from "@/lib/uploadthing"

import { useToast } from "@/components/ui/use-toast"
import { useMounted } from "@/lib/hooks/mounted"
import { useState } from "react"
import Link from "next/link"

import "@uploadthing/react/styles.css"

type ImageUploadModalProps = {
    isOpen: boolean
    isLoading: boolean
    onClose: () => void
    onConfirm: () => void
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, isLoading, onClose, onConfirm }) => {
    useMounted()

    const [images, setImages] = useState<UploadResponse[]>([])

    const title = images.length ? (
        <div>
            <h4>Upload Complete!</h4>
            <p className="mt-2">{images.length}</p>
        </div>
    ) : null

    const imgList = (
        <div>
            {title}
            <ul>
                {images.map((image) => (
                    <li
                        key={image.fileUrl}
                        className="mt-2"
                    >
                        <Link
                            href={image.fileUrl}
                            target="_blank"
                        >
                            {image.fileUrl}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )

    const { toast } = useToast()

    return (
        <Modal
            title="Upload An Image"
            description="This image will be used as a billboard for your store"
            isOpen={isOpen}
            onClose={onClose}
            // icon={<AlertIcon className="stroke-warning-foreground size-xl" />}
        >
            <div className="flex w-full justify-center space-x-2 pt-8">
                {/* <Button */}
                {/*     disabled={isLoading} */}
                {/*     onClick={onClose} */}
                {/*     variant="outline" */}
                {/* > */}
                {/*     Cancel */}
                {/* </Button> */}
                <UploadDropzone
                    endpoint="media"
                    onClientUploadComplete={(res) => {
                        if (res) {
                            setImages(res)
                            const json = JSON.stringify(res)
                            console.log("Files: ", json)
                            toast({
                                title: "Billboard Created",
                            })
                        }
                    }}
                    onUploadError={(error: Error) => {
                        console.log("[UPLOAD_THING_ON_UPLOAD]", error.message)
                        toast({
                            title: "An error has occured :(",
                            description: error.message,
                        })
                    }}
                />
                {/* <Button */}
                {/*     base="soft" */}
                {/*     variant="destructive" */}
                {/*     disabled={isLoading} */}
                {/*     onClick={onConfirm} */}
                {/* > */}
                {/*     <Spinner */}
                {/*         isLoading={isLoading} */}
                {/*         className="mr-2" */}
                {/*     /> */}
                {/*     Continue */}
                {/* </Button> */}
            </div>
        </Modal>
    )
}