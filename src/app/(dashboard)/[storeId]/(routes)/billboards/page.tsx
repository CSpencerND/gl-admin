import { BillboardClient } from "@/components/billboard"
import { MainDiv, SectionDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"

import type { NextPage } from "next"
import type { BillboardParams } from "@/types"

type BillboardsPageProps = BillboardParams

const BillboardsPage: NextPage<BillboardsPageProps> = async ({ params: { storeId } }) => {
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    return (
        <MainDiv>
            <SectionDiv>
                <BillboardClient data={billboards} />
            </SectionDiv>
        </MainDiv>
    )
}

export default BillboardsPage
