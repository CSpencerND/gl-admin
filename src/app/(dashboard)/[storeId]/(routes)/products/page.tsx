import { DataClient } from "@/components/data-client"
import { ProductColumns } from "@/components/tables/product-columns"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"
import { formatPrice } from "@/lib/utils"
import { format } from "date-fns"

import type { ProductColumn } from "@/components/tables/product-columns"
import type { ProductParams } from "@/types"
import type { NextPage } from "next"

type ProductsPageProps = ProductParams

const ProductsPage: NextPage<ProductsPageProps> = async ({ params: { storeId } }) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId,
        },
        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    const formattedProducts: ProductColumn[] = products.map(
        ({ id, name, isFeatured, isArchived, price, createdAt }) => ({
            id,
            name,
            price: formatPrice(price),
            storeId,
            isArchived,
            isFeatured,
            createdAt: format(createdAt, "MMMM do, yyyy"),
        })
    )

    return (
        <MainDiv>
            <DataClient
                data={formattedProducts}
                columns={ProductColumns}
                searchKey="label"
                entityName="Products"
                entityIdName="productId"
            />
        </MainDiv>
    )
}

export default ProductsPage
