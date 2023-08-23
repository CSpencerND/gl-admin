import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImagePlusIcon } from "lucide-react"

import { useUploadThing } from "@/lib/uploadthing"

import { cn } from "@/lib/utils"

import type { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form"

type TForm<TFieldValues extends FieldValues> = UseFormReturn<TFieldValues, any, undefined>
type TField<TFieldValues extends FieldValues> = ControllerRenderProps<TFieldValues, Path<TFieldValues>>

type ImagePickerProps<TFieldValues extends FieldValues> = {
    field: TField<TFieldValues>
    form: TForm<TFieldValues>
    setFiles: (files: File[]) => void
}

export function ImagePicker<TFieldValues extends FieldValues>(props: ImagePickerProps<TFieldValues>) {
    const { setFiles, form, field } = props

    const { permittedFileInfo } = useUploadThing("single")
    const maxFileSize = permittedFileInfo?.config.image?.maxFileSize
    const maxFileCount = permittedFileInfo?.config.image?.maxFileCount

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const fileReader = new FileReader()

        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0]

            setFiles(Array.from(e.target.files))

            if (!selectedFile.type.includes("image")) {
                form.setError(field.name, { message: "Only jpg, jpeg, png and webp files are accepted" })
                return
            }

            if (selectedFile.size > 2 * 1024 ** 2) {
                form.setError(field.name, { message: "Only files up to 2MB are accepted" })
                return
            }

            form.clearErrors(field.name)

            fileReader.onload = async (e) => {
                const imageDataUrl = e.target?.result?.toString() ?? ""

                field.onChange({
                    ...field.value,
                    url: imageDataUrl,
                })
            }

            fileReader.readAsDataURL(selectedFile)
        }
    }

    const disabled: boolean = field.value.length > 0 || field.value.url

    return (
        <div className="space-y-2 !mt-8 sm:w-fit grid place-items-center">
            <Button
                asChild
                type="button"
                variant="secondary"
            >
                <label className={cn(disabled ? "pointer-events-none opacity-50" : "cursor-pointer")}>
                    <Input
                        type="file"
                        accept="image/*"
                        disabled={disabled}
                        onChange={handleImage}
                        className="hidden"
                    />
                    <ImagePlusIcon className="size-sm mr-3" />
                    Choose Image
                </label>
            </Button>
            {maxFileSize && maxFileCount ? (
                <div className="text-xs text-muted-foreground w-fit mx-auto">
                    <p>{`${maxFileCount} image(s) - ${maxFileSize} - webp please`}</p>
                </div>
            ) : (
                <p className="h-4" />
            )}
        </div>
    )
}
