import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// export function tw(prefix: string, classes: string): string {
//     const regex = /(?<=\s|^)(\S+)/g

//     return classes.replace(regex, `${prefix}:$1`)
// }
