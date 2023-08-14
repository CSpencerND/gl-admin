"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { PlusCircleIcon } from "lucide-react"

import { useRouter, useParams } from "next/navigation"

import type { StoreParams } from "@/types"
import type { Billboard } from "@prisma/client"

type BillboardClientProps = {
    data: Billboard[]
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
                <Button onClick={() => router.push(`/${storeId}/billboards/new`)}>
                    <PlusCircleIcon className="mr-3 size-sm" />
                    Add New
                </Button>
            </div>
            <Separator />
        </>
    )
}
