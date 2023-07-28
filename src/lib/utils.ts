import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

type BaseColor = {
    [k: string]: `#${string}`;
};

export function tw2hsl(baseColor: BaseColor) {
    return Object.fromEntries(
        Object.entries(baseColor).map(([k, v]) => [k, hex2hsl(v)])
    )
}

export function hex2hsl(hex: string): string {
    // Remove the '#' symbol if present
    if (hex.startsWith("#")) {
        hex = hex.slice(1);
    }

    // Convert hex to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Convert RGB to HSL
    const rDecimal = r / 255;
    const gDecimal = g / 255;
    const bDecimal = b / 255;

    const max = Math.max(rDecimal, gDecimal, bDecimal);
    const min = Math.min(rDecimal, gDecimal, bDecimal);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case rDecimal:
                h = (gDecimal - bDecimal) / d + (gDecimal < bDecimal ? 6 : 0);
                break;
            case gDecimal:
                h = (bDecimal - rDecimal) / d + 2;
                break;
            case bDecimal:
                h = (rDecimal - gDecimal) / d + 4;
                break;
        }

        h = h! / 6; // Use the "Non-null Assertion" operator to handle potential undefined value
    }

    // Convert HSL values to string format
    const hStr = Math.round(h! * 360);
    const sStr = (s * 100).toFixed(1);
    const lStr = (l * 100).toFixed(1);

    return `${hStr} ${sStr}% ${lStr}%`;
}
