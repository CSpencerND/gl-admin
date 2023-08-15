"use client"

import { ApiList } from "@/components/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { PlusCircleIcon } from "lucide-react"
import { columns, type BillboardColumn } from "./table/columns"

import { useParams, useRouter } from "next/navigation"

import type { StoreParams } from "@/types"
import { SectionDiv } from "./ui/divs"

type BillboardClientProps = {
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
    const router = useRouter()
    const { storeId } = useParams() as StoreParams["params"]

    return (
        <>
            <SectionDiv>
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Billboards (${data.length})`}
                        description="Manage Billboards For Your Store"
                    />
                    <Button
                        className="bg-primary"
                        onClick={() => router.push(`/${storeId}/billboards/new`)}
                    >
                        <PlusCircleIcon className="mr-3 size-sm" />
                        Add New
                    </Button>
                </div>
                <DataTable
                    data={data}
                    searchKey="label"
                    columns={columns}
                    className="max-w-5xl mx-auto"
                />
            </SectionDiv>
            <SectionDiv>
                <Heading
                    title="API"
                    description="API calls for Billboards"
                />
                <ApiList
                    entityName="billboards"
                    entityId="billboardId"
                />
            </SectionDiv>
        </>
    )
}
