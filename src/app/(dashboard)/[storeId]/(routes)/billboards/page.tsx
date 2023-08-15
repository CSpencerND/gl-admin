import { DataClient } from "@/components/clients/data-client"
import { BillboardColumns } from "@/components/tables/billboard-columns"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"
import { format } from "date-fns"

import type { BillboardColumn } from "@/components/tables/billboard-columns"
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
            <DataClient
                data={formattedBillboards}
                columns={BillboardColumns}
                searchKey="label"
                entityName="Billboards"
                entityId="billboardId"
            />
        </MainDiv>
    )
}

export default BillboardsPage
