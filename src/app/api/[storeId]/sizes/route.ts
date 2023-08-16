import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import type { SizeFormValues, StoreParams } from "@/types"

export async function POST(req: Request, { params: { storeId } }: StoreParams) {
    try {
        const { userId } = auth()
        const { name, value } = (await req.json()) as SizeFormValues

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!value) {
            return new NextResponse("Value is required", { status: 400 })
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

        const size = await prismadb.size.create({
            data: {
                name,
                value,
                storeId,
            },
        })

        return NextResponse.json(size)
    } catch (error) {
        console.log("[SIZES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(_req: Request, { params: { storeId } }: StoreParams) {
    try {
        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const sizes = await prismadb.size.findMany({
            where: {
                storeId,
            },
        })

        return NextResponse.json(sizes)
    } catch (error) {
        console.log("[SIZES_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
