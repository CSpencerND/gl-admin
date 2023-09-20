/** @ts-ignore */
import animate from "tailwindcss-animate"
import shadcn from "./shadcn-plugin-tailwindcss"

import type { Config } from "tailwindcss"

const shadcnPreset = {
    content: [],
    darkMode: ["class"],
    plugins: [animate, shadcn]
} satisfies Config

export default shadcnPreset
