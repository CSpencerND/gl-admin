import { UploadFileResponse } from "@/types"
import * as z from "zod"

export const imagePlaceholder =
    "data:image/webp;base64,UklGRgACAABXRUJQVlA4IPQBAAAQIwCdASoDAQMBPpFIoUulpCOhpHGosLASCWlu4XMxxj8zxYavNFWpp0EEkyQy9L4bzm2opVGbailUZtqKVRm2opTYbJSn9YzN+N0EEkyQy0Wuwg03EIT+hsAlZ2UMDTS5La3+hl4xSVMg7NX74mUMAbL8YqBKSfex97fHG2oo/0qmRsnzvjWRnei52p5pFpy6CCSSp4SPE/ozTqgyrUxbvomHcQjvZWbUUqfoG44GSgDuG6UBPIgLu/YdnOVm1FKn6BtBs0ARDy/qqVwdleeTcybVm1FKn576BLdkTvj4jJY/zxc7zjrSmn+tztoCt1kcPWxcMD8QQSTYxl421FKozbUUqjNtRSqM21FKozbUUqjNtRSqM21FKozbUUqjNsyAAP797KDoCK1mjirrT9OQGytzZkLB3CQLwxGGzETgjoSyh+6ikrwJNMk4QBniXrmG4o20qc7iDz01pKWvWrhWhXU6+4HPAtKzKasUkutBayGDvqs9faXMfG9IYGles+m/LjdLdqBKr2V4d8RrmhR+sN9crXjhSwI5dCQkV+Ror2PVm4VWqEeIhqH4ThHy6nxAvnI1/bFmRCrZPuoEFASNjZQxJ6DW1HF3z/Y/c9G1dCcCsndgdKISWXsfcQrVWEB4WA2ZKdnB5A6x3APjj6Y+OOAAAA=="

const defaultSource = {
    name: "",
    size: 0,
    key: "",
    url: "",
} satisfies UploadFileResponse

const zImageSource = z.object({
    name: z.string(),
    size: z.number(),
    key: z.string(),
    url: z.string(),
})

export const imageSource = {
    default: defaultSource,
    zod: zImageSource,
} as const

export const fileError = {
    type: "Only jpg, jpeg, png and webp files are accepted",
    size: "Only files up to 2MB are accepted",
} as const
