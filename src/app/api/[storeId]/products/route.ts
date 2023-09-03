import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import type { ProductFormValues, StoreParams } from "@/types"

export async function POST(req: Request, { params: { storeId } }: StoreParams) {
    try {
        const { userId } = auth()

        const { name, price, categoryId, colorId, sizeId, images, isArchived, isFeatured } =
            (await req.json()) as ProductFormValues

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!price) {
            return new NextResponse("Price is required", { status: 400 })
        }

        if (!categoryId) {
            return new NextResponse("Category ID is required", { status: 400 })
        }

        if (!sizeId) {
            return new NextResponse("Size ID is required", { status: 400 })
        }

        if (!colorId) {
            return new NextResponse("Color ID is required", { status: 400 })
        }

        if (!images || !images.length) {
            return new NextResponse("Images are requires", { status: 400 })
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

        const product = await prismadb.product.create({
            data: {
                storeId,
                name,
                price,
                categoryId,
                sizeId,
                colorId,
                isFeatured,
                isArchived,
                images: {
                    createMany: {
                        data: images,
                    },
                },
            },
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log("[PRODUCTS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(req: Request, { params: { storeId } }: StoreParams) {
    try {
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get("categoryId") ?? undefined
        const colorId = searchParams.get("colorId") ?? undefined
        const sizeId = searchParams.get("sizeId") ?? undefined
        const isFeatured = searchParams.get("isFeatured") ? true : undefined

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived: false,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return NextResponse.json(products)
    } catch (error) {
        console.log("[PRODUCTS_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
