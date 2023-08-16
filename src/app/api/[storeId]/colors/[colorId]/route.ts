import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { ColorFormValues, ColorParams } from "@/types"

export async function PATCH(req: Request, { params: { storeId, colorId } }: ColorParams) {
    try {
        const { userId } = auth()
        const { name, value } = (await req.json()) as ColorFormValues

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name Is Required", { status: 400 })
        }

        if (!value) {
            return new NextResponse("Value Is Required", { status: 400 })
        }

        if (!colorId) {
            return new NextResponse("Color ID is required", { status: 400 })
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

        const color = await prismadb.color.updateMany({
            where: {
                id: colorId,
            },
            data: {
                name,
                value,
            },
        })
        return NextResponse.json(color)
    } catch (error) {
        console.log("[COLOR_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(_req: Request, { params: { storeId, colorId } }: ColorParams) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!colorId) {
            return new NextResponse("Color ID is required", { status: 400 })
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

        const color = await prismadb.color.delete({
            where: {
                id: colorId,
            },
        })

        return NextResponse.json(color)
    } catch (error) {
        console.log("[COLOR_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(_req: Request, { params: { colorId } }: ColorParams) {
    try {
        if (!colorId) {
            return new NextResponse("Color ID is required", { status: 400 })
        }

        const color = await prismadb.color.findUnique({
            where: {
                id: colorId,
            },
        })

        return NextResponse.json(color)
    } catch (error) {
        console.log("[COLOR_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
