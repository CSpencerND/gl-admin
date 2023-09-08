import { deleteFilesFromServer } from "@/lib/actions/uploadthing"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import type { BannerFormValues, BannerParams } from "@/types"

export async function PATCH(req: Request, { params: { storeId, bannerId } }: BannerParams) {
    try {
        const { userId } = auth()
        const { label, key, name, url, size } = (await req.json()) as BannerFormValues

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!label) {
            return new NextResponse("Label Is Required", { status: 400 })
        }

        if (!url || !key || !name || !size) {
            return new NextResponse("An Image Is Required", { status: 400 })
        }

        if (!bannerId) {
            return new NextResponse("Banner ID is required", { status: 400 })
        }

        const storeMatchByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId,
            },
        })

        if (!storeMatchByUserId) {
            return new NextResponse("You do not have the appropriate credentials to modify this content", {
                status: 403,
            })
        }

        const banner = await prismadb.banner.update({
            where: {
                id: bannerId,
            },
            data: {
                label,
                name,
                key,
                size,
                url,
            },
        })
        return NextResponse.json(banner)
    } catch (error) {
        console.log("[BANNER_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(_req: Request, { params: { storeId, bannerId } }: BannerParams) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!bannerId) {
            return new NextResponse("Banner ID is required", { status: 400 })
        }

        const storeMatchByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId,
            },
        })

        if (!storeMatchByUserId) {
            return new NextResponse("You do not have the appropriate credentials to modify this content", {
                status: 403,
            })
        }

        const banner = await prismadb.banner.delete({
            where: {
                id: bannerId,
            },
        })

        const uploadthing = await deleteFilesFromServer(banner?.key)

        return NextResponse.json([banner, uploadthing])
    } catch (error) {
        console.log("[BANNER_DELETE]", error)

        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(_req: Request, { params: { bannerId } }: BannerParams) {
    try {
        if (!bannerId) {
            return new NextResponse("Banner ID is required", { status: 400 })
        }

        const banner = await prismadb.banner.findUnique({
            where: {
                id: bannerId,
            },
        })

        return NextResponse.json(banner)
    } catch (error) {
        console.log("[BANNER_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
