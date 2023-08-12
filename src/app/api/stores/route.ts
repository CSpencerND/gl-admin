import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import type { StoreFormValues } from "@/types"

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const { name } = (await req.json()) as StoreFormValues

        if (!userId) {
            return new NextResponse("You must be logged in", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId,
            },
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log("[STORES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
