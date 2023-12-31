import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { StoreFormValues, StoreParams } from "@/types"

export async function PATCH(req: Request, { params: { storeId } }: StoreParams) {
    try {
        const { userId } = auth()
        const { name } = (await req.json()) as StoreFormValues

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name Is Required", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: storeId,
                userId,
            },
            data: {
                name,
            },
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log("[STORE_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(_req: Request, { params: { storeId } }: StoreParams) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const store = await prismadb.store.delete({
            where: {
                id: storeId,
                userId,
            },
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log("[STORE_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
