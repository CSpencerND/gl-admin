"use server"

import prismadb from "@/lib/prismadb"

export type GraphData = {
    name: string
    total: number
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const getGraphRevenue = async (storeId: string) => {
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

    const monthlyRevenue: Record<number, number> = {}

    for (const order of paidOrders) {
        const month = order.createdAt.getMonth()
        let revenueForOrder = 0

        for (const item of order.items) {
            revenueForOrder += item.product.price.toNumber()
        }

        monthlyRevenue[month] = (monthlyRevenue[month] ?? 0) + revenueForOrder
    }

    const graphData: GraphData[] = monthNames.map((monthName) => ({ name: monthName, total: 0 }))

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
    }

    return graphData
}
