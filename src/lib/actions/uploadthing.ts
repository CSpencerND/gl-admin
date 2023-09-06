"use server"

import prismadb from "@/lib/prismadb"
import { utapi } from "uploadthing/server"

export const deleteFilesFromServer = async (fileKeys: string | string[]) => {
    if (!fileKeys || fileKeys?.length === 0) return

    try {
        const uploadthingResponse = await utapi.deleteFiles(fileKeys)

        if (uploadthingResponse.success && Array.isArray(fileKeys)) {
            const prismaResponse = await prismadb.productImage.deleteMany({
                where: {
                    key: {
                        in: fileKeys,
                    },
                },
            })
            return { uploadthingResponse, prismaResponse }
        }

        return uploadthingResponse
    } catch (error) {
        console.log("[UPLOADTHING_DELETE]", error)
        throw error
    }
}
