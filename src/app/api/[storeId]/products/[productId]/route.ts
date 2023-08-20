import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { ProductFormValues, ProductParams } from "@/types"

export async function PATCH(req: Request, { params: { storeId, productId } }: ProductParams) {
    try {
        const { userId } = auth()
        const { name, price, categoryId, colorId, sizeId, images, isArchived, isFeatured } =
            (await req.json()) as ProductFormValues

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!productId) {
            return new NextResponse("Product ID is required", { status: 400 })
        }

        if (!name) {
            return new NextResponse("Name Is Required", { status: 400 })
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

        await prismadb.product.update({
            where: {
                id: productId,
            },
            data: {
                name,
                price,
                categoryId,
                sizeId,
                colorId,
                isFeatured,
                isArchived,
                images: {
                    deleteMany: [],
                },
            },
        })

        const product = await prismadb.product.update({
            where: {
                id: productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [...images.map((image: { url: string }) => image)],
                    },
                },
            },
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log("[PRODUCT_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(_req: Request, { params: { storeId, productId } }: ProductParams) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!productId) {
            return new NextResponse("Product ID is required", { status: 400 })
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

        const product = await prismadb.product.delete({
            where: {
                id: productId,
            },
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log("[PRODUCT_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(_req: Request, { params: { productId } }: ProductParams) {
    try {
        if (!productId) {
            return new NextResponse("Product ID is required", { status: 400 })
        }

        const product = await prismadb.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            },
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log("[PRODUCT_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
