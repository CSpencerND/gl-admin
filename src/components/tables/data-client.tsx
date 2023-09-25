"use client"

import { ApiList } from "@/components/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { SectionDiv } from "@/components/ui/divs"
import { Heading } from "@/components/ui/heading"
import { PlusCircleIcon } from "lucide-react"
import { OrderColumns, type OrderColumn } from "./order-columns"
import { Card } from "@/components/ui/card"

import { useParams, useRouter } from "next/navigation"

import type { StoreParams } from "@/types"
import type { ComponentProps } from "react"

type DataClientProps<TData, TValue> = ComponentProps<typeof DataTable<TData, TValue>> & ComponentProps<typeof ApiList>

function DataClient<TData, TValue>(props: DataClientProps<TData, TValue>) {
    const { columns, data, searchKey, entityName, entityIdName } = props

    const router = useRouter()
    const { storeId } = useParams() as StoreParams["params"]

    return (
        <>
            <SectionDiv>
                <div className="flex items-center justify-between">
                    <Heading
                        title={`${entityName} (${data.length})`}
                        description={`Manage ${entityName} for your store`}
                        className="p-2"
                    />
                    <Button
                        onClick={() => router.push(`/${storeId}/${entityName.toLowerCase()}/new`)}
                        className="self-start"
                    >
                        <PlusCircleIcon className="mr-3 size-sm" />
                        Add New
                    </Button>
                </div>
                <Card>
                    <DataTable
                        data={data}
                        searchKey={searchKey}
                        columns={columns}
                        className="font-mono"
                    />
                </Card>
            </SectionDiv>
            <SectionDiv>
                <Heading
                    className="pl-2"
                    title="API"
                    description={`CRUD operations for ${entityName}`}
                />
                <ApiList
                    entityName={entityName.toLowerCase()}
                    entityIdName={entityIdName}
                />
            </SectionDiv>
        </>
    )
}

type OrderDataClientProps = {
    data: OrderColumn[]
}

function OrderDataClient({ data }: OrderDataClientProps) {
    return (
        <SectionDiv>
            <Heading
                title={`Orders (${data.length})`}
                description={`Manage orders for your store`}
                className="p-2"
            />
            <Card>
                <DataTable
                    data={data}
                    searchKey="products"
                    columns={OrderColumns}
                    className="font-mono"
                />
            </Card>
        </SectionDiv>
    )
}

export { DataClient, OrderDataClient }
