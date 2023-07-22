import type { Config } from "tailwindcss"
import shadcn from "./shadcn-plugin-tailwindcss"
import animate from "tailwindcss-animate"

const shadcnPreset = {
    content: [],
    darkMode: ["class"],
    plugins: [animate, shadcn]
} satisfies Config

export default shadcnPreset
