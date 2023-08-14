"use client"

import { CellAction } from "@/components/table/cell-action"

import { ColumnDef } from "@tanstack/react-table"

export type BillboardColumn = {
    id: string
    label: string
    createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
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
        cell: ({ row }) => <CellAction data={row.original} />,
    },
]
