import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { CategoryFormValues, CategoryParams } from "@/types"

export async function PATCH(req: Request, { params: { storeId, categoryId } }: CategoryParams) {
    try {
        const { userId } = auth()
        const { name, billboardId } = (await req.json()) as CategoryFormValues

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name Is Required", { status: 400 })
        }

        if (!billboardId) {
            return new NextResponse("Billboard ID Is Required", { status: 400 })
        }

        if (!categoryId) {
            return new NextResponse("Category ID is required", { status: 400 })
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

        const category = await prismadb.category.updateMany({
            where: {
                id: categoryId,
            },
            data: {
                name,
                billboardId,
            },
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORY_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(_req: Request, { params: { storeId, categoryId } }: CategoryParams) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!categoryId) {
            return new NextResponse("Category ID is required", { status: 400 })
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

        const category = await prismadb.category.delete({
            where: {
                id: categoryId,
            },
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORY_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(_req: Request, { params: { categoryId } }: CategoryParams) {
    try {
        if (!categoryId) {
            return new NextResponse("Category ID is required", { status: 400 })
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: categoryId,
            },
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORY_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
