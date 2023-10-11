import { Navbar } from "@/components/navbar"

import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import type { StoreParams } from "@/types"

type DashboardLayoutProps = React.PropsWithChildren<StoreParams>

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            users: {
                some: {
                    id: userId,
                },
            },
        },
    })

    if (!store) {
        redirect("/")
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
