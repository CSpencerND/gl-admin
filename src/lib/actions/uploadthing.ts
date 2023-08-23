"use server"

import { utapi } from "uploadthing/server"

export const deleteFromUploadthing = async (fileKey: string | undefined) => {
    if (!fileKey) throw new ReferenceError("fileKey is undefined")

    try {
        const res = await utapi.deleteFiles(fileKey)
        return res
    } catch (error) {
        console.log("[UPLOADTHING_DELETE]", error)
        return error
    }
}
