import { MainDiv, SectionDiv } from "@/components/ui/divs"
import { BillboardForm } from "@/components/forms/billboard-form"

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
            id: params.billboardId
        }
    })

    return (
        <MainDiv>
            <SectionDiv>
                <BillboardForm initialData={billboard} />
            </SectionDiv>
        </MainDiv>
    )
}

export default BillboardPage
