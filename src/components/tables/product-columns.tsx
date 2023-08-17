"use client"

import { CellAction } from "@/components/tables/cell-action"

import type { ColumnDef } from "@tanstack/react-table"
import type { ColumnType } from "@/types"

type CellActionProps = {
    data: ProductColumn
}

export type ProductColumn = ColumnType<{
    label: string
}>

const ProductCellAction: React.FC<CellActionProps> = ({ data }) => {
    return (
        <CellAction
            data={data}
            entityName="Product"
            pathSegment="products"
        />
    )
}

export const ProductColumns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <ProductCellAction data={row.original} />,
    },
]
