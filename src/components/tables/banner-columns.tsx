"use client"

import { CellAction } from "@/components/tables/cell-action"

import type { ColumnDef } from "@tanstack/react-table"
import type { ColumnType } from "@/types"

type CellActionProps = {
    data: BannerColumn
}

export type BannerColumn = ColumnType<{
    label: string
}>

const BannerCellAction: React.FC<CellActionProps> = ({ data }) => {
    return (
        <CellAction
            data={data}
            entityName="Banner"
            pathSegment="banners"
        />
    )
}

export const BannerColumns: ColumnDef<BannerColumn>[] = [
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
        cell: ({ row }) => <BannerCellAction data={row.original} />,
    },
]
