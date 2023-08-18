"use client"

import { CellAction } from "@/components/tables/cell-action"

import type { ColumnDef } from "@tanstack/react-table"
import type { ColumnType } from "@/types"

type CellActionProps = {
    data: ProductColumn
}

export type ProductColumn = ColumnType<{
    name: string
    price: string
    size: string
    color: string
    category: string
    isFeatured: boolean
    isArchived: boolean
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
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                {row.original.color}
                <div
                    aria-hidden="true"
                    className="size-md rounded-full border"
                    style={{ backgroundColor: row.original.color }}
                />
            </div>
        ),
    },
    {
        accessorKey: "isArchived",
        header: "Archived",
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
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
