import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImagePlusIcon } from "lucide-react"

import { useUploadThing } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"

function ImagePicker() {}

type ImagePickerProps = {
    hasValue?: boolean
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Single({ hasValue, handleChange }: ImagePickerProps) {
    const { permittedFileInfo } = useUploadThing("single")
    const maxFileSize = permittedFileInfo?.config.image?.maxFileSize
    const maxFileCount = permittedFileInfo?.config.image?.maxFileCount

    return (
        <div className="space-y-2 !mt-8 sm:w-fit grid place-items-center">
            <Button
                asChild
                type="button"
                variant="secondary"
            >
                <label className={cn(hasValue ? "pointer-events-none opacity-50" : "cursor-pointer")}>
                    <Input
                        type="file"
                        accept="image/*"
                        disabled={hasValue}
                        onChange={(e) => handleChange(e)}
                        className="hidden"
                    />
                    <ImagePlusIcon className="size-sm mr-3" />
                    Choose Image
                </label>
            </Button>
            {maxFileSize && maxFileCount ? (
                <div className="text-xs text-muted-foreground w-fit mx-auto">
                    {/* <p>{`up to ${maxFileCount} image(s) - ${maxFileSize} - webp please`}</p> */}
                    <p>prefer webp</p>
                </div>
            ) : (
                <p className="h-4" />
            )}
        </div>
    )
}

function Multi({ handleChange }: ImagePickerProps) {
    const { permittedFileInfo } = useUploadThing("multi")
    const maxFileSize = permittedFileInfo?.config.image?.maxFileSize
    const maxFileCount = permittedFileInfo?.config.image?.maxFileCount

    return (
        <div className="space-y-2 !mt-8 sm:w-fit grid place-items-center">
            <Button
                asChild
                type="button"
                variant="secondary"
            >
                <label className="cursor-pointer">
                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleChange(e)}
                        className="hidden"
                    />
                    <ImagePlusIcon className="size-sm mr-3" />
                    Choose Image(s)
                </label>
            </Button>
            {maxFileSize && maxFileCount ? (
                <div className="text-xs text-muted-foreground w-fit text-center space-y-1">
                    {/* <p>{`${maxFileCount} image(s) at once @ ${maxFileSize} max`}</p> */}
                    <p>prefer webp</p>
                </div>
            ) : (
                <p className="h-4" />
            )}
        </div>
    )
}

ImagePicker.Single = Single
ImagePicker.Multi = Multi

export { ImagePicker }
