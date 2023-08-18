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

    const formattedProducts: ProductColumn[] = products.map((product) => {
        const { id, name, isFeatured, isArchived, price, size, color, category, createdAt } = product

        return {
            id,
            name,
            price: formatPrice(price),
            size: size.name,
            color: color.value,
            category: category.name,
            isArchived,
            isFeatured,
            createdAt: format(createdAt, "MMMM do, yyyy"),
        }
    })

    return (
        <MainDiv>
            <DataClient
                data={formattedProducts}
                columns={ProductColumns}
                searchKey="name"
                entityName="Products"
                entityIdName="productId"
            />
        </MainDiv>
    )
}

export default ProductsPage
