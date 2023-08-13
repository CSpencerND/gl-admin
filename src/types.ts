export type { BillboardFormValues } from "@/components/forms/billboard-form"
export type { StoreFormValues } from "@/components/forms/settings-form"

export type StoreParams<T = Record<string, string>> = {
    params: {
        storeId: string
    } & T
}

export type BillboardParams = StoreParams<{
    billboardId: string
}>
