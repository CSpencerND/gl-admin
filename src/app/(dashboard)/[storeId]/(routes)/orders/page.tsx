import { OrderDataClient } from "@/components/tables/data-client"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"
import { formatPrice } from "@/lib/utils"
import { format } from "date-fns"

import type { OrderColumn } from "@/components/tables/order-columns"
import type { OrderParams } from "@/types"
import type { NextPage } from "next"

type OrdersPageProps = OrderParams

const OrdersPage: NextPage<OrdersPageProps> = async ({ params: { storeId } }) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    const formattedOrders: OrderColumn[] = orders.map(({ id, phone, address, orderItems, status, createdAt }) => {
        const total = orderItems.reduce((total, item) => {
            const price = Number(item.product.price)
            return total + price
        }, 0)

        return {
            id,
            phone,
            address,
            products: orderItems.map((orderItem) => orderItem.product.name).join(", "),
            totalPrice: formatPrice(total),
            status,
            createdAt: format(createdAt, "MMMM do, yyyy"),
        }
    })

    return (
        <MainDiv>
            <OrderDataClient data={formattedOrders} />
        </MainDiv>
    )
}

export default OrdersPage
