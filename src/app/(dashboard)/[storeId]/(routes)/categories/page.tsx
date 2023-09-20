import { DataClient } from "@/components/tables/data-client"
import { CategoryColumns } from "@/components/tables/category-columns"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"
import { format } from "date-fns"

import type { CategoryColumn } from "@/components/tables/category-columns"
import type { CategoryParams } from "@/types"
import type { NextPage } from "next"

type CategoriesPageProps = CategoryParams

const CategoriesPage: NextPage<CategoriesPageProps> = async ({ params: { storeId } }) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId,
        },
        include: {
            banner: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    const formattedCategories: CategoryColumn[] = categories.map(({ id, name, banner, createdAt }) => ({
        id,
        name,
        bannerLabel: banner.label,
        createdAt: format(createdAt, "MMMM do, yyyy"),
    }))

    return (
        <MainDiv>
            <DataClient
                data={formattedCategories}
                columns={CategoryColumns}
                searchKey="name"
                entityName="Categories"
                entityIdName="categoryId"
            />
        </MainDiv>
    )
}

export default CategoriesPage
