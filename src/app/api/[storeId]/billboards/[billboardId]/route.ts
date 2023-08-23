import { deleteFilesFromServer } from "@/lib/actions/uploadthing"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import type { BillboardFormValues, BillboardParams } from "@/types"

export async function PATCH(req: Request, { params: { storeId, billboardId } }: BillboardParams) {
    try {
        const { userId } = auth()
        const { label, source } = (await req.json()) as BillboardFormValues

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!label) {
            return new NextResponse("Label Is Required", { status: 400 })
        }

        if (!source) {
            return new NextResponse("Image URL Is Required", { status: 400 })
        }

        if (!billboardId) {
            return new NextResponse("Billboard ID is required", { status: 400 })
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

        const billboard = await prismadb.billboard.update({
            where: {
                id: billboardId,
            },
            data: {
                label,
                source: {
                    update: {
                        data: source,
                    },
                },
            },
        })
        return NextResponse.json(billboard)
    } catch (error) {
        console.log("[BILLBOARD_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(_req: Request, { params: { storeId, billboardId } }: BillboardParams) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!billboardId) {
            return new NextResponse("Billboard ID is required", { status: 400 })
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

        const billboard = await prismadb.billboard.delete({
            where: {
                id: billboardId,
            },
            include: {
                source: {
                    select: {
                        key: true,
                    },
                },
            },
        })

        const uploadthing = await deleteFilesFromServer(billboard?.source?.key)

        return NextResponse.json([billboard, uploadthing])
    } catch (error) {
        console.log("[BILLBOARD_DELETE]", error)

        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(_req: Request, { params: { billboardId } }: BillboardParams) {
    try {
        if (!billboardId) {
            return new NextResponse("Billboard ID is required", { status: 400 })
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: billboardId,
            },
            include: {
                source: {
                    select: {
                        name: true,
                        size: true,
                        key: true,
                        url: true,
                    },
                },
            },
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log("[BILLBOARD_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
