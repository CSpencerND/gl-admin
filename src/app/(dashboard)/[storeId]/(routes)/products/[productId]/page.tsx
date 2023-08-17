import { ProductForm } from "@/components/forms/product-form"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"

import type { NextPage } from "next"

type ProductPageProps = {
    params: {
        productId: string
    }
}

const ProductPage: NextPage<ProductPageProps> = async ({ params }) => {
    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId,
        },
    })

    return (
        <MainDiv>
            <ProductForm initialData={product} />
        </MainDiv>
    )
}

export default ProductPage
