import { ProductForm } from "@/components/forms/product-form"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"

import type { NextPage } from "next"
import type { ProductParams } from "@/types"

type ProductPageProps = ProductParams

const ProductPage: NextPage<ProductPageProps> = async ({ params: { storeId, productId } }) => {
    const product = await prismadb.product.findUnique({
        where: {
            id: productId,
        },
        include: {
            images: true
        },
    })

    const categories = await prismadb.category.findMany({
        where: {
            storeId,
        },
    })

    // const sizes = await prismadb.size.findMany({
    //     where: {
    //         storeId,
    //     },
    // })

    // const colors = await prismadb.color.findMany({
    //     where: {
    //         storeId,
    //     },
    // })

    return (
        <MainDiv>
            <ProductForm
                initialData={product}
                entityName="Product"
                routeSegment="products"
                {...{ categories}}
            />
        </MainDiv>
    )
}

export default ProductPage
