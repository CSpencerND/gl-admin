import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import type { BillboardFormValues, BillboardParams } from "@/types"

export async function POST(req: Request, { params: { storeId } }: BillboardParams) {
    try {
        const { userId } = auth()
        const { label, imageKey } = (await req.json()) as BillboardFormValues

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!label) {
            return new NextResponse("Label is required", { status: 400 })
        }

        if (!imageKey) {
            return new NextResponse("Image URL is required", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const storeMatchByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId: userId,
            },
        })

        if (!storeMatchByUserId) {
            return new NextResponse("You do not have the appropriate credentials to modify this content", {
                status: 403,
            })
        }

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageKey,
                storeId,
            },
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log("[BILLBOARDS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(_req: Request, { params: { storeId } }: BillboardParams) {
    try {
        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId,
            },
        })

        return NextResponse.json(billboards)
    } catch (error) {
        console.log("[BILLBOARDS_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
