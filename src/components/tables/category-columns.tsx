"use client"

import { CellAction } from "@/components/tables/cell-action"

import type { ColumnDef } from "@tanstack/react-table"
import type { ColumnType } from "@/types"

type CellActionProps = {
    data: CategoryColumn
}

export type CategoryColumn = ColumnType<{
    name: string
    bannerLabel: string
}>

const CategoryCellAction: React.FC<CellActionProps> = ({ data }) => {
    return (
        <CellAction
            data={data}
            entityName="Category"
            pathSegment="categories"
        />
    )
}

export const CategoryColumns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "banner",
        header: "Banner",
        cell: ({ row }) => row.original.bannerLabel,
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CategoryCellAction data={row.original} />,
    },
]
