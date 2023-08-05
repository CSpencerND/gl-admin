import { MainDiv } from "@/components/ui/main-div"

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
            <div>Existing Billboard: {billboard?.label ?? "None"}</ div>
        </MainDiv>
    )
}

export default BillboardPage
