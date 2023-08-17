import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { Decimal } from "@prisma/client/runtime/library"

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}

export function isBase64Image(imageData: string): boolean {
    const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/
    return base64Regex.test(imageData)
}

export function formatDateString(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }

    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString(undefined, options)

    const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    })

    return `${time} - ${formattedDate}`
}

export function formatThreadCount(count: number): string {
    if (count === 0) {
        return "No Threads"
    } else {
        const threadCount = count.toString().padStart(2, "0")
        const threadWord = count === 1 ? "Thread" : "Threads"
        return `${threadCount} ${threadWord}`
    }
}

export function formatPrice(price: Decimal): string {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    })

    return formatter.format(price.toNumber())
}
