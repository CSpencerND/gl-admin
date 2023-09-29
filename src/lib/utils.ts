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

export function formatPrice(price: number | Decimal): string {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    })

    return typeof price === "number" ? formatter.format(price) : formatter.format(price.toNumber())
}

type SubmitActionText = "Save Changes" | "Confirm" | "Continue"

/**
 * Generate strings based on initial data and entity name.
 * @param {boolean} hasInitialData - Pass `!!initialData` as the argument.
 * @param {string} entityName - The name of the entity. e.g. "Banner" | "Product" | "Category"
 * @param {string} dependentEntity - The entity which will prevent removal if connected.
 * i.e. "You must remove all `dependentEntity` associated with this `entityName` first"
 */
export function generateFormPageStrings(hasInitialData: boolean, entityName: string, dependentEntity?: string) {
    const headingTitle = hasInitialData ? `Edit ${entityName}` : `Create ${entityName}`
    const headingDescription = hasInitialData ? `Manage a ${entityName} for your store` : `Add A New ${entityName}`
    const submitActionText: SubmitActionText = hasInitialData ? "Save Changes" : "Confirm"
    const toastSuccess = hasInitialData ? `${entityName} Updated` : `${entityName} Created`
    const toastError = `You must remove all ${dependentEntity} associated with this ${entityName} first`

    return { headingTitle, headingDescription, submitActionText, toastSuccess, toastError }
}

export async function readImageFile(file: File) {
    return new Promise<string>((resolve, reject) => {
        const fr = new FileReader()

        fr.onload = (e) => {
            if (e.target) {
                resolve(e.target.result as string)
            }
        }

        fr.onerror = () => {
            reject(new Error("Error reading file"))
        }

        fr.readAsDataURL(file)
    })
}

export function validateImageFile(selectedFile: File) {
    if (!selectedFile.type.includes("image")) {
        return "Only jpg, jpeg, png and webp files are accepted"
    }

    if (selectedFile.size > 2 * 1024 ** 2) {
        return "Only jpg, jpeg, png and webp files are accepted"
    }

    return 0
}

export function isHexCode(input: string): boolean {
    const hexColorPattern = /^#([0-9A-Fa-f]{3}){1,2}$/

    return hexColorPattern.test(input)
}

export function formatAmountForDisplay(amount: number, currency: string): string {
    let numberFormat = new Intl.NumberFormat(["en-US"], {
        style: "currency",
        currency: currency,
        currencyDisplay: "symbol",
    })
    return numberFormat.format(amount)
}

export function formatAmountForStripe(amount: number, currency: string): number {
    let numberFormat = new Intl.NumberFormat(["en-US"], {
        style: "currency",
        currency: currency,
        currencyDisplay: "symbol",
    })
    const parts = numberFormat.formatToParts(amount)
    let zeroDecimalCurrency: boolean = true
    for (let part of parts) {
        if (part.type === "decimal") {
            zeroDecimalCurrency = false
        }
    }
    return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}
