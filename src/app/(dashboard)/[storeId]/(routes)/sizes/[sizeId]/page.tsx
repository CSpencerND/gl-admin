import { BillboardForm } from "@/components/forms/billboard-form"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"

import type { NextPage } from "next"

type BillboardPageProps = {
    params: {
        billboardId: string
    }
}

const BillboardPage: NextPage<BillboardPageProps> = async ({ params }) => {
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId,
        },
    })

    return (
        <MainDiv>
            <BillboardForm initialData={billboard} />
        </MainDiv>
    )
}

export default BillboardPage
