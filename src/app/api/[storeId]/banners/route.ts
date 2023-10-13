import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import type { BannerFormValues, StoreParams } from "@/types"

export async function POST(req: Request, { params: { storeId } }: StoreParams) {
    try {
        const { userId } = auth()
        const { label, url, key, name, size } = (await req.json()) as BannerFormValues

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!label) {
            return new NextResponse("Label is required", { status: 400 })
        }

        if (!url || !key || !name || !size) {
            return new NextResponse("An Image is required", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const storeMatchByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
        })

        if (!storeMatchByUserId) {
            return new NextResponse("You do not have the appropriate credentials to modify this content", {
                status: 403,
            })
        }

        const banner = await prismadb.banner.create({
            data: {
                label,
                storeId,
                key,
                url,
                size,
                name,
            },
        })

        return NextResponse.json(banner)
    } catch (error) {
        console.log("[BANNERS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(_req: Request, { params: { storeId } }: StoreParams) {
    try {
        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const banners = await prismadb.banner.findMany({
            where: {
                storeId,
            },
        })

        return NextResponse.json(banners)
    } catch (error) {
        console.log("[BANNERS_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
