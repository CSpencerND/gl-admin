import type { Config } from "tailwindcss"

import typography from "@tailwindcss/typography"
// import animate from "tailwindcss-animate"
import shadcn from "./src/lib/shadcn-plugin-tailwindcss"
// import daisyui from "daisyui"


// import { fontFamily } from "tailwindcss/defaultTheme"

const config = {
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],

    presets: [shadcn],

    plugins: [typography, require("prettier-plugin-tailwindcss")],
    // plugins: [typography, prettier, daisyui],

    // daisyui: {
    //     styled: false,
    //     base: true,
    //     utils: true,
    //     logs: false,
    //     rtl: false,
    //     prefix: "",
    //     darkTheme: "dark",
    //     themes: [],
    // },
    //
} satisfies Config

export default config
