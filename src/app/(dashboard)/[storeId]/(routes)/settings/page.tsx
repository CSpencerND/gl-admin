import { SettingsForm } from "@/components/forms/settings-form"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

type SettingsPageProps = {
    params: {
        storeId: string
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        },
    })

    if (!store) {
        redirect("/")
    }

    return (
        <MainDiv>
            <SettingsForm initialData={store} />
        </MainDiv>
    )
}

export default SettingsPage
