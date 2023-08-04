import typography from "@tailwindcss/typography"
import shadcn from "./shadcn-plugin-tailwindcss"

import type { Config } from "tailwindcss"

const config = {
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

export default config
