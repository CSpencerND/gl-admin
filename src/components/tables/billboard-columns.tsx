"use client"

import { CellAction } from "@/components/tables/cell-action"

import type { ColumnDef } from "@tanstack/react-table"
import type { ColumnType } from "@/types"

type CellActionProps = {
    data: BillboardColumn
}

export type BillboardColumn = ColumnType<{
    label: string
}>

const BillboardCellAction: React.FC<CellActionProps> = ({ data }) => {
    return (
        <CellAction
            data={data}
            entityName="Billboard"
            pathSegment="billboards"
        />
    )
}

export const BillboardColumns: ColumnDef<BillboardColumn>[] = [
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
        cell: ({ row }) => <BillboardCellAction data={row.original} />,
    },
]
