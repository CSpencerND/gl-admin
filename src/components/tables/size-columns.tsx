"use client"

import { CellAction } from "@/components/tables/cell-action"

import type { ColumnType } from "@/types"
import type { ColumnDef } from "@tanstack/react-table"

type CellActionProps = {
    data: SizeColumn
}

export type SizeColumn = ColumnType<{
    name: string
    value: string
}>

const SizeCellAction: React.FC<CellActionProps> = ({ data }) => {
    return (
        <CellAction
            data={data}
            entityName="Size"
            pathSegment="sizes"
        />
    )
}

export const SizeColumns: ColumnDef<SizeColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <SizeCellAction data={row.original} />,
    },
]
