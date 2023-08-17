export type { StoreFormValues } from "@/components/forms/settings-form"
export type { BillboardFormValues } from "@/components/forms/billboard-form"
export type { CategoryFormValues } from "@/components/forms/category-form"
export type { SizeFormValues } from "@/components/forms/size-form"
export type { ColorFormValues } from "@/components/forms/color-form"
export type { ProductFormValues } from "@/components/forms/product-form"

export type StoreParams<T = Record<string, string>> = {
    params: {
        storeId: string
    } & T
}

export type BillboardParams = StoreParams<{
    billboardId: string
}>

export type CategoryParams = StoreParams<{
    categoryId: string
}>

export type SizeParams = StoreParams<{
    sizeId: string
}>

export type ColorParams = StoreParams<{
    colorId: string
}>

export type ProductParams = StoreParams<{
    productId: string
}>

export type ColumnType<T = {}> = {
    id: string
    createdAt: string
} & T
