import { DataClient } from "@/components/tables/data-client"
import { SizeColumns } from "@/components/tables/size-columns"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"
import { format } from "date-fns"

import type { SizeColumn } from "@/components/tables/size-columns"
import type { SizeParams } from "@/types"
import type { NextPage } from "next"

type SizesPageProps = SizeParams

const SizesPage: NextPage<SizesPageProps> = async ({ params: { storeId } }) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    const formattedSizes: SizeColumn[] = sizes.map(({ id, name, value, createdAt }) => ({
        id,
        name,
        value,
        createdAt: format(createdAt, "MMMM do, yyyy"),
    }))

    return (
        <MainDiv>
            <DataClient
                data={formattedSizes}
                columns={SizeColumns}
                searchKey="name"
                entityName="Sizes"
                entityIdName="sizeId"
            />
        </MainDiv>
    )
}

export default SizesPage
