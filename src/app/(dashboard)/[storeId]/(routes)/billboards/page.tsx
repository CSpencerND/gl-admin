import { BillboardClient } from "@/components/billboard-client"
import { MainDiv, SectionDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"
import { format } from "date-fns"

import type { BillboardColumn } from "@/components/table/columns"
import type { BillboardParams } from "@/types"
import type { NextPage } from "next"

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

    const formattedBillboards: BillboardColumn[] = billboards.map(({ id, label, createdAt }) => ({
        id,
        label,
        createdAt: format(createdAt, "MMMM do, yyyy"),
    }))

    return (
        <MainDiv>
            <SectionDiv>
                <BillboardClient data={formattedBillboards} />
            </SectionDiv>
        </MainDiv>
    )
}

export default BillboardsPage
