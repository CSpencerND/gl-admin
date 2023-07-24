import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        createStore(req)
    } catch (error: unknown) {
        internalError(error)
    }
}

async function createStore(req: Request) {
    const { userId } = auth()
    const body = await req.json()
    const { name } = body

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!name) {
        return new NextResponse("Name is required", { status: 404 })
    }

    const store = await prismadb.store.create({
        data: {
            name,
            userId,
        },
    })

    return NextResponse.json(store)
}

function internalError(error: unknown) {
    console.log("[STORES_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
}
