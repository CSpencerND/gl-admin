import { MainDiv, SectionDiv } from "@/components/ui/divs"
import { CategoryForm } from "@/components/forms/category-form"

import prismadb from "@/lib/prismadb"

import type { NextPage } from "next"

type CategoryPageProps = {
    params: {
        categoryId: string
    }
}

const CategoryPage: NextPage<CategoryPageProps> = async ({ params }) => {
    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId
        }
    })

    return (
        <MainDiv>
            <SectionDiv>
                <CategoryForm initialData={category} />
            </SectionDiv>
        </MainDiv>
    )
}

export default CategoryPage
