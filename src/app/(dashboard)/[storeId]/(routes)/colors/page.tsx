import { DataClient } from "@/components/clients/data-client"
import { ColorColumns } from "@/components/tables/color-columns"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"
import { format } from "date-fns"

import type { ColorColumn } from "@/components/tables/color-columns"
import type { ColorParams } from "@/types"
import type { NextPage } from "next"

type ColorsPageProps = ColorParams

const ColorsPage: NextPage<ColorsPageProps> = async ({ params: { storeId } }) => {
    const colors = await prismadb.color.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    const formattedColors: ColorColumn[] = colors.map(({ id, name, value, createdAt }) => ({
        id,
        name,
        value,
        createdAt: format(createdAt, "MMMM do, yyyy"),
    }))

    return (
        <MainDiv>
            <DataClient
                data={formattedColors}
                columns={ColorColumns}
                searchKey="name"
                entityName="Colors"
                entityIdName="colorId"
            />
        </MainDiv>
    )
}

export default ColorsPage
