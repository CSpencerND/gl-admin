export const imagePlaceholder =
    "data:image/webp;base64,UklGRgACAABXRUJQVlA4IPQBAAAQIwCdASoDAQMBPpFIoUulpCOhpHGosLASCWlu4XMxxj8zxYavNFWpp0EEkyQy9L4bzm2opVGbailUZtqKVRm2opTYbJSn9YzN+N0EEkyQy0Wuwg03EIT+hsAlZ2UMDTS5La3+hl4xSVMg7NX74mUMAbL8YqBKSfex97fHG2oo/0qmRsnzvjWRnei52p5pFpy6CCSSp4SPE/ozTqgyrUxbvomHcQjvZWbUUqfoG44GSgDuG6UBPIgLu/YdnOVm1FKn6BtBs0ARDy/qqVwdleeTcybVm1FKn576BLdkTvj4jJY/zxc7zjrSmn+tztoCt1kcPWxcMD8QQSTYxl421FKozbUUqjNtRSqM21FKozbUUqjNtRSqM21FKozbUUqjNsyAAP797KDoCK1mjirrT9OQGytzZkLB3CQLwxGGzETgjoSyh+6ikrwJNMk4QBniXrmG4o20qc7iDz01pKWvWrhWhXU6+4HPAtKzKasUkutBayGDvqs9faXMfG9IYGles+m/LjdLdqBKr2V4d8RrmhR+sN9crXjhSwI5dCQkV+Ror2PVm4VWqEeIhqH4ThHy6nxAvnI1/bFmRCrZPuoEFASNjZQxJ6DW1HF3z/Y/c9G1dCcCsndgdKISWXsfcQrVWEB4WA2ZKdnB5A6x3APjj6Y+OOAAAA=="

export const theme = {
    primary: "#14b8a6",
    muted: "#71717a",
}

export const CURRENCY = "usd"
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
export const MIN_AMOUNT = 10.0
export const MAX_AMOUNT = 5000.0
export const AMOUNT_STEP = 5.0

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
} as const

export const orderStatus = {
    requires_payment_method: "pending",
    requires_confirmation: "pending",
    requires_action: "pending",
    requires_capture: "pending",
    processing: "pending",
    canceled: "cancelled",
    succeeded: "paid",
} as const
