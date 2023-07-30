// @ts-check

/** @type {import("prettier").Config} */
module.exports = {
    plugins: ["prettier-plugin-tailwindcss"],
    tailwindConfig: "./tailwind.config.ts",
    tailwindFunctions: ["clsx", "twMerge", "cn", "tw", "expandVariant"],
    trailingComma: "es5",
    tabWidth: 4,
    semi: false,
    singleQuote: false,
    printWidth: 120,
    singleAttributePerLine: true,
}
