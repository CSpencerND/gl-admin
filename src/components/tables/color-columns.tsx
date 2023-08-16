"use client"

import { CellAction } from "@/components/tables/cell-action"

import type { ColumnType } from "@/types"
import type { ColumnDef } from "@tanstack/react-table"

type CellActionProps = {
    data: ColorColumn
}

export type ColorColumn = ColumnType<{
    name: string
    value: string
}>

const ColorCellAction: React.FC<CellActionProps> = ({ data }) => {
    return (
        <CellAction
            data={data}
            entityName="Color"
            pathSegment="colors"
        />
    )
}

export const ColorColumns: ColumnDef<ColorColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                {row.original.value}
                <div
                    aria-hidden="true"
                    className="size-md rounded-full border border-ring"
                    style={{ backgroundColor: row.original.value }}
                />
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <ColorCellAction data={row.original} />,
    },
]
