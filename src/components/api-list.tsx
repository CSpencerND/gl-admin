"use client"

import { ApiCard } from "@/components/api-card"

import { useOrigin } from "@/lib/hooks/use-origin"
import { useParams } from "next/navigation"

import type { StoreParams } from "@/types"

type ApiListProps = {
    entityName: string
    entityId: string
}

export const ApiList: React.FC<ApiListProps> = ({ entityId, entityName }) => {
    const { storeId } = useParams() as StoreParams["params"]
    const origin = useOrigin()
    const baseUrl = `${origin}/api/${storeId}`

    return (
        <>
            <ApiCard
                method="GET"
                quantity="multi"
                accessLevel="public"
                content={`${baseUrl}/${entityName}`}
            />
            <ApiCard
                method="GET"
                quantity="single"
                accessLevel="public"
                content={`${baseUrl}/${entityName}/{${entityId}}`}
            />
            <ApiCard
                method="POST"
                accessLevel="admin"
                content={`${baseUrl}/${entityName}`}
            />
            <ApiCard
                method="PATCH"
                accessLevel="admin"
                content={`${baseUrl}/${entityName}/{${entityId}}`}
            />
            <ApiCard
                method="DELETE"
                accessLevel="admin"
                content={`${baseUrl}/${entityName}/{${entityId}}`}
            />
        </>
    )
}
