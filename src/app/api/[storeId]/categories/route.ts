import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import type { CategoryFormValues, StoreParams } from "@/types"

export async function POST(req: Request, { params: { storeId } }: StoreParams) {
    try {
        const { userId } = auth()
        const { name, bannerId } = (await req.json()) as CategoryFormValues

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!bannerId) {
            return new NextResponse("Banner ID is required", { status: 400 })
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

        const category = await prismadb.category.create({
            data: {
                name,
                bannerId,
                storeId,
            },
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORIES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(_req: Request, { params: { storeId } }: StoreParams) {
    try {
        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const categories = await prismadb.category.findMany({
            where: {
                storeId,
            },
        })

        return NextResponse.json(categories)
    } catch (error) {
        console.log("[CATEGORIES_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
