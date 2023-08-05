"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { PlusCircleIcon } from "lucide-react"

import { useRouter, useParams } from "next/navigation"

type BillboardProps = {}

export const Billboard: React.FC<BillboardProps> = ({ ...props }) => {
    const router = useRouter()
    const storeId = useParams().storeId

    return (
        <>
            <div
                className="flex items-center justify-between"
                {...props}
            >
                <Heading
                    title="Billboards (0)"
                    description="Manage Billboards For Your Store"
                />
                <Button
                    onClick={() => router.push(
                        `/${storeId}/billboards/new`
                    )}
                >
                    <PlusCircleIcon className="mr-3 size-sm" />
                    Add New
                </Button>
            </div>
            <Separator />
        </>
    )
}
