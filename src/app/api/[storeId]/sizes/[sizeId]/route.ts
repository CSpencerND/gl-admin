import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { SizeFormValues, SizeParams } from "@/types"

export async function PATCH(req: Request, { params: { storeId, sizeId } }: SizeParams) {
    try {
        const { userId } = auth()
        const { name, value } = (await req.json()) as SizeFormValues

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name Is Required", { status: 400 })
        }

        if (!value) {
            return new NextResponse("Value Is Required", { status: 400 })
        }

        if (!sizeId) {
            return new NextResponse("Size ID is required", { status: 400 })
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

        const size = await prismadb.size.updateMany({
            where: {
                id: sizeId,
            },
            data: {
                name,
                value,
            },
        })
        return NextResponse.json(size)
    } catch (error) {
        console.log("[SIZE_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(_req: Request, { params: { storeId, sizeId } }: SizeParams) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!sizeId) {
            return new NextResponse("Size ID is required", { status: 400 })
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

        const size = await prismadb.size.delete({
            where: {
                id: sizeId,
            },
        })

        return NextResponse.json(size)
    } catch (error) {
        console.log("[SIZE_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(_req: Request, { params: { sizeId } }: SizeParams) {
    try {
        if (!sizeId) {
            return new NextResponse("Size ID is required", { status: 400 })
        }

        const size = await prismadb.size.findUnique({
            where: {
                id: sizeId,
            },
        })

        return NextResponse.json(size)
    } catch (error) {
        console.log("[SIZE_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
