"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { PlusCircleIcon } from "lucide-react"
import { columns, type BillboardColumn } from "./table/columns"

import { useParams, useRouter } from "next/navigation"

import type { StoreParams } from "@/types"

type BillboardClientProps = {
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
    const router = useRouter()
    const { storeId } = useParams() as StoreParams["params"]

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    description="Manage Billboards For Your Store"
                />
                <Button className="bg-primary" onClick={() => router.push(`/${storeId}/billboards/new`)}>
                    <PlusCircleIcon className="mr-3 size-sm" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                data={data}
                searchKey="label"
                columns={columns}
                className="max-w-5xl mx-auto"
            />
        </>
    )
}
