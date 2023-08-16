import { DataClient } from "@/components/clients/data-client"
import { SizesColumns } from "@/components/tables/size-columns"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"
import { format } from "date-fns"

import type { SizesColumn } from "@/components/tables/size-columns"
import type { SizesParams } from "@/types"
import type { NextPage } from "next"

type SizesPageProps = SizesParams

const SizesPage: NextPage<SizesPageProps> = async ({ params: { storeId } }) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    const formattedSizes: SizesColumn[] = sizes.map(({ id, name, value, createdAt }) => ({
        id,
        name,
        value,
        createdAt: format(createdAt, "MMMM do, yyyy"),
    }))

    return (
        <MainDiv>
            <DataClient
                data={formattedSizes}
                columns={SizesColumns}
                searchKey="label"
                entityName="Sizes"
                entityId="sizeId"
            />
        </MainDiv>
    )
}

export default SizesPage
