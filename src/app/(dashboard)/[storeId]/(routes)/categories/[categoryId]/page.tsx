import { CategoryForm } from "@/components/forms/category-form"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"

import type { CategoryParams } from "@/types"
import type { NextPage } from "next"

type CategoryPageProps = CategoryParams

const CategoryPage: NextPage<CategoryPageProps> = async ({ params: { storeId, categoryId } }) => {
    const category = await prismadb.category.findUnique({
        where: {
            id: categoryId,
        },
    })

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId,
        },
    })

    return (
        <MainDiv>
            <CategoryForm
                initialData={category}
                billboards={billboards}
            />
        </MainDiv>
    )
}

export default CategoryPage
