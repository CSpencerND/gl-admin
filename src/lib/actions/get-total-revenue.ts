"use server"

import prismadb from "@/lib/prismadb"

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            status: "paid",
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    })

    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.items.reduce((orderSum, item) => {
            return orderSum + item.product.price.toNumber()
        }, 0)

        return total + orderTotal
    }, 0)

    return totalRevenue
}
