import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function SetupLayout({ children }: React.PropsWithChildren) {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const user = await userGET(userId)
    if (!user) {
        await userPOST(userId)
    } else {
        const store = await prismadb.store.findFirst({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
        })

        if (store) {
            redirect(`/${store.id}`)
        }
    }

    return <>{children}</>
}

async function userGET(id: string) {
    return await prismadb.user.findFirst({
        where: {
            id,
        },
    })
}

async function userPOST(id: string) {
    return await prismadb.user.create({
        data: {
            id,
        },
    })
}
