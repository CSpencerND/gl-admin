export type { BannerFormValues } from "@/components/forms/banner-form"
export type { CategoryFormValues } from "@/components/forms/category-form"
export type { ColorFormValues } from "@/components/forms/color-form"
export type { ProductFormValues } from "@/components/forms/product-form"
export type { StoreFormValues } from "@/components/forms/settings-form"
export type { SizeFormValues } from "@/components/forms/size-form"
export type { GraphData } from "@/lib/actions/get-graph-revenue"

export type ImageData = {
    name: string
    size: number
    key: string
    url: string
    fileName?: string
    fileSize?: number
    fileKey?: string
    fileUrl?: string
}

export type StoreParams<T = Record<string, string>> = {
    params: {
        storeId: string
    } & T
}

export type BannerParams = StoreParams<{
    bannerId: string
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

export type OrderParams = StoreParams<{
    orderId: string
}>

export type FormProps<TModel> = {
    initialData: TModel | null
    entityName: string
    routeSegment: string
    dependentEntity?: string
}

export type ColumnType<T = {}> = {
    id: string
    createdAt: string
} & T

export type CheckoutRequest = {
    productIds: string[]
}
