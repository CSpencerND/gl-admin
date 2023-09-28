"use client"

import type { ColumnType } from "@/types"
import type { OrderStatus } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = ColumnType<{
    phone: string
    address: string
    status: OrderStatus
    totalPrice: string
    products: string
}>

export const OrderColumns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
]
