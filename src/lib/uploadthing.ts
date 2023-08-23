import { generateComponents } from "@uploadthing/react"
import { generateReactHelpers } from "@uploadthing/react/hooks"

import type { UTFileRouter } from "@/app/api/uploadthing/core"

// import "@uploadthing/react/styles.css"

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<UTFileRouter>()

export const { useUploadThing, uploadFiles } = generateReactHelpers<UTFileRouter>()

export const urlFromKey = (key: string) => `https://uploadthing.com/f/${key}`

export { UTFileRouter }

export type { UploadFileResponse } from "uploadthing/client"
