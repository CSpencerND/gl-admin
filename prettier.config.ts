import type { Config as Prettier } from "prettier"

type Config = Prettier & {
    tailwindConfig?: string
    tailwindFunctions?: string[]
}

const config = {
    // plugins: ["prettier-plugin-tailwindcss"],
    // tailwindConfig: "./tailwind.config.ts",
    // tailwindFunctions: ["clsx", "twMerge", "cn", "tw", "expandVariant"],
    trailingComma: "es5",
    tabWidth: 4,
    semi: false,
    singleQuote: false,
    printWidth: 120,
    singleAttributePerLine: true,
} satisfies Config

export default config
