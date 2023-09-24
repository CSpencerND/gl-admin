"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { useState } from "react"

import { cn } from "@/lib/utils"

export type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey: string
    className?: string
}

export function DataTable<TData, TValue>({ columns, data, searchKey, className }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    })

    const pageCount = table.getPageCount()
    const currentPage = table.getState().pagination.pageIndex + 1
    const canPrevPage = table.getCanPreviousPage()
    const canNextPage = table.getCanNextPage()

    return (
        <div className={className}>
            <div className="flex items-center py-4">
                <Input
                    placeholder={`Search by ${searchKey} ...`}
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-lg">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className={cn(pageCount > 1 ? "flex items-center justify-end gap-2 pt-2" : "hidden")}>
                <Button
                    // variant="outline"
                    variant={canPrevPage ? "outline" : "ghost"}
                    size="icon"
                    onClick={() => table.previousPage()}
                    disabled={!canPrevPage}
                    // className={cn(!canPrevPage ? "hidden" : "")}
                >
                    <ChevronLeftIcon />
                </Button>
                <p>
                    {currentPage} of {pageCount}
                </p>
                <Button
                    // variant="outline"
                    variant={canNextPage ? "outline" : "ghost"}
                    size="icon"
                    onClick={() => table.nextPage()}
                    disabled={!canNextPage}
                    // className={cn(!canNextPage ? "hidden" : "")}
                >
                    <ChevronRightIcon />
                </Button>
            </div>
        </div>
    )
}
