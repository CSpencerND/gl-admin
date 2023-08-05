import typography from "@tailwindcss/typography"
import shadcn from "./shadcn-plugin-tailwindcss"

import type { Config } from "tailwindcss"

export default {
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],

    presets: [
        shadcn
    ],

    plugins: [
        typography,
    ],

} satisfies Config
