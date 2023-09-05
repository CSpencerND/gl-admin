import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImagePlusIcon } from "lucide-react"

import { UploadFileResponse, useUploadThing } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"

import type { BillboardFormValues, ProductFormValues } from "@/types"
import type { ControllerRenderProps, FieldPath, FieldValues, UseFormReturn } from "react-hook-form"
import unionBy from "lodash.unionby"
import { imageData } from "@/constants"

type ImagePickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
    form: UseFormReturn<TFieldValues, any, undefined>
    field: ControllerRenderProps<TFieldValues, TName>
    setFiles: (files: File[]) => void
}

function ImagePicker<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>() {
    // props: ImagePickerProps<TFieldValues, TName>
}

type SinglePickerProps = {
    hasValue: boolean
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Single({ hasValue, handleChange }: SinglePickerProps) {
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
                    <p>{`${maxFileCount} image(s) - ${maxFileSize} - webp please`}</p>
                </div>
            ) : (
                <p className="h-4" />
            )}
        </div>
    )
}

function Multi(props: ImagePickerProps<ProductFormValues, "images">) {
    const { setFiles, form, field } = props

    const { permittedFileInfo } = useUploadThing("multi")
    const maxFileSize = permittedFileInfo?.config.image?.maxFileSize
    const maxFileCount = permittedFileInfo?.config.image?.maxFileCount

    // const [images, setImages] = useState<UploadFileResponse[]>([])

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const fileList = e.target.files
        if (!fileList) return
        const files = Array.from(fileList)

        const hasError = files.some(validateFile)
        if (hasError) return

        form.clearErrors(field.name)
        setFiles(files)

        const imageDataUrls = await Promise.all(files.map(readFile))

        const newImages = imageDataUrls.map((imageDataUrl, i) => ({
            ...imageSource.default,
            name: files[i].name,
            url: imageDataUrl,
        }))

        const initialImages = field.value
        const mergedImages = unionBy(initialImages, newImages, "name").filter((image) => image.name)

        field.onChange(mergedImages)
    }

    const readFile = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const fr = new FileReader()

            fr.onload = (e) => {
                if (e.target) {
                    resolve(e.target.result as string)
                }
            }

            fr.onerror = () => {
                reject(new Error("Error reading file"))
            }

            fr.readAsDataURL(file)
        })
    }

    const validateFile = (selectedFile: File) => {
        if (!selectedFile.type.includes("image")) {
            form.setError(field.name, { message: fileError.type })
            return true
        }

        if (selectedFile.size > 2 * 1024 ** 2) {
            form.setError(field.name, { message: fileError.size })
            return true
        }

        return false
    }

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

ImagePicker.Single = Single
ImagePicker.Multi = Multi

export { ImagePicker }

// type SinglePickerProps = {
//     field: ControllerRenderProps<
//         {
//             label: string
//             image: {
//                 name: string
//                 url: string
//                 size: number
//                 key: string
//             }
//         },
//         "image"
//     >
//     form: UseFormReturn<
//         {
//             label: string
//             image: {
//                 name: string
//                 url: string
//                 size: number
//                 key: string
//             }
//         },
//         any,
//         undefined
//     >
//     setFiles: (files: File[]) => void
// }

// type MultiPickerProps = {
//     field: ControllerRenderProps<
//         {
//             name: string
//             price: number
//             categoryId: string
//             colorId: string
//             sizeId: string
//             images: {
//                 size: number
//                 name: string
//                 key: string
//                 url: string
//             }[]
//             isFeatured?: boolean | undefined
//             isArchived?: boolean | undefined
//         },
//         "images"
//     >
//     form: UseFormReturn<
//         {
//             images: {
//                 name: string
//                 url: string
//                 size: number
//                 key: string
//             }[]
//             name: string
//             price: number
//             categoryId: string
//             colorId: string
//             sizeId: string
//             isFeatured?: boolean | undefined
//             isArchived?: boolean | undefined
//         },
//         any,
//         undefined
//     >
//     setFiles: (files: File[]) => void
// }
