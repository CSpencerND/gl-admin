import plugin from "tailwindcss/plugin"

import { kanagawa as base } from "./theme"

const shadcnPlugin = plugin(
    // add css variable definition to base layer
    function({ addBase, addUtilities }) {
        // addBase({
        //     ":root": {
        //         "--background": base[100],
        //         "--foreground": base[900],
        //         "--muted": "240 4.8% 95.9%",
        //         "--muted-foreground": "240 3.8% 46.1%",
        //         "--popover": "0 0% 100%",
        //         "--popover-foreground": "240 10% 3.9%",
        //         "--card": base[50],
        //         "--card-foreground": base[900],
        //         "--border": "240 5.9% 90%",
        //         "--input": "240 5.9% 90%",
        //         "--primary": base[900],
        //         "--primary-foreground": base[50],
        //         "--secondary": "240 4.8% 95.9%",
        //         "--secondary-foreground": "240 5.9% 10%",
        //         "--accent": "240 4.8% 95.9%",
        //         "--accent-foreground": "240 5.9% 10%",
        //         "--destructive": base.destruct,
        //         "--destructive-foreground": base.destruct,
        //         "--warning": "23 100% 70%",
        //         "--warning-foreground": "23 100% 70%",
        //         "--ring": "240 5% 64.9%",
        //         "--radius": "0.5rem",
        //         "--shadow-opactity": "0.333",
        //     },
        //     ".dark": {
        //         "--background": base[900],
        //         "--foreground": base[100],
        //         "--muted": base[700],
        //         "--muted-foreground": base[300],
        //         "--popover": base[900],
        //         "--popover-foreground": base[100],
        //         "--card": base[900],
        //         "--card-foreground": base[100],
        //         "--border": base[800],
        //         "--input": base[700],
        //         "--ring": base[600],
        //         "--primary": base[100],
        //         "--primary-foreground": base[800],
        //         "--secondary": base[800],
        //         "--secondary-foreground": base[100],
        //         "--accent": base[600],
        //         "--accent-foreground": base[100],
        //         "--destructive": base.destruct,
        //         "--destructive-foreground": base.destruct,
        //         "--warning": "23 100% 70%",
        //         "--warning-foreground": "23 100% 70%",
        //     },
        // })

        addBase({
            ':root': {
                '--background': '240 0% 100%',
                '--foreground': '240 10% 3.9%',
                '--muted': '240 4.8% 95.9%',
                '--muted-foreground': '240 3.8% 46.1%',
                '--popover': '0 0% 100%',
                '--popover-foreground': '240 10% 3.9%',
                '--card': '0 0% 100%',
                '--card-foreground': '240 10% 3.9%',
                '--border': '240 5.9% 60%',
                '--input': '240 5.9% 90%',
                '--primary': '240 5.9% 10%',
                '--primary-foreground': '0 0% 98%',
                '--secondary': '240 4.8% 95.9%',
                '--secondary-foreground': '240 5.9% 10%',
                '--accent': '240 4.8% 95.9%',
                '--accent-foreground': '240 5.9% 10%',
                '--destructive': '0 84.2% 60.2%',
                '--destructive-foreground': '0 0% 98%',
                "--warning": "38 92% 50%",
                "--warning-foreground": "48 96% 89%",
                '--ring': '240 5% 64.9%',
                '--radius': '0.5rem',
            },
            '.dark': {
                '--background': '240 10% 3.9%',
                '--foreground': '0 0% 98%',
                '--muted': '240 3.7% 15.9%',
                '--muted-foreground': '240 5% 64.9%',
                '--popover': '240 10% 3.9%',
                '--popover-foreground': '0 0% 98%',
                '--card': '240 10% 3.9%',
                '--card-foreground': '0 0% 98%',
                '--border': '240 3.7% 15.9%',
                '--input': '240 3.7% 15.9%',
                '--primary': '0 0% 98%',
                '--primary-foreground': '240 5.9% 10%',
                '--secondary': '240 3.7% 15.9%',
                '--secondary-foreground': '0 0% 98%',
                '--accent': '240 3.7% 15.9%',
                '--accent-foreground': '0 0% 98%',
                '--destructive': '0 62.8% 30.6%',
                '--destructive-foreground': '0 85.7% 97.3%',
                "--warning": "48 96% 89%",
                "--warning-foreground": "38 92% 50%",
                '--ring': '240 3.7% 15.9%',
            }
        })

        addBase({
            "*": {
                "@apply border-border": {},
            },

            "html, body, :root": {
                height: "100%",
            },

            body: {
                "@apply bg-background text-foreground": {},
                "font-feature-settings": `"rlig" 1, "calt" 1`,
            },
        })

        addUtilities({
            ".size-xs": {
                "@apply w-4 h-4": {},
            },

            ".size-sm": {
                "@apply w-5 h-5": {},
            },

            ".size-md": {
                "@apply w-6 h-6": {},
            },
            ".size-lg": {
                "@apply w-7 h-7": {},
            },
            ".size-xl": {
                "@apply w-8 h-8": {},
            },
            ".size-2xl": {
                "@apply w-9 h-9": {},
            },
            ".size-3xl": {
                "@apply w-10 h-10": {},
            },
        })
    },

    // extend tailwind theme with `themeable` utilities
    {
        theme: {
            container: {
                center: true,
                padding: "2rem",
                screens: {
                    "2xl": "1400px",
                },
            },
            extend: {
                colors: {
                    background: "hsl(var(--background))",
                    foreground: "hsl(var(--foreground))",
                    border: "hsl(var(--border))",
                    input: "hsl(var(--input))",
                    ring: "hsl(var(--ring))",
                    primary: {
                        DEFAULT: "hsl(var(--primary))",
                        foreground: "hsl(var(--primary-foreground))",
                    },
                    secondary: {
                        DEFAULT: "hsl(var(--secondary))",
                        foreground: "hsl(var(--secondary-foreground))",
                    },
                    destructive: {
                        DEFAULT: "hsl(var(--destructive))",
                        // DEFAULT: "hsl(var(--destructive) / 0.25)",
                        foreground: "hsl(var(--destructive-foreground))",
                    },
                    warning: {
                        DEFAULT: "hsl(var(--warning))",
                        // DEFAULT: "hsl(var(--warning) / 0.25)",
                        foreground: "hsl(var(--warning-foreground))",
                    },
                    muted: {
                        DEFAULT: "hsl(var(--muted))",
                        foreground: "hsl(var(--muted-foreground))",
                    },
                    accent: {
                        DEFAULT: "hsl(var(--accent))",
                        foreground: "hsl(var(--accent-foreground))",
                    },
                    popover: {
                        DEFAULT: "hsl(var(--popover))",
                        foreground: "hsl(var(--popover-foreground))",
                    },
                    card: {
                        DEFAULT: "hsl(var(--card))",
                        foreground: "hsl(var(--card-foreground))",
                    },
                },
                borderRadius: {
                    lg: "var(--radius)",
                    md: "calc(var(--radius) - 2px)",
                    sm: "calc(var(--radius) - 4px)",
                },
                keyframes: {
                    "accordion-down": {
                        from: { height: "0" },
                        to: { height: "var(--radix-accordion-content-height)" },
                    },
                    "accordion-up": {
                        from: { height: "var(--radix-accordion-content-height)" },
                        to: { height: "0" },
                    },
                },
                animation: {
                    "accordion-down": "accordion-down 0.2s ease-out",
                    "accordion-up": "accordion-up 0.2s ease-out",
                },
                boxShadow: {
                    top: "0 -15px 40px -10px rgb(0 0 0 / 0.25)",
                    // top: "0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 -4px 6px -4px rgb(0 0 0 / 0.1)"
                },
                // boxShadowColor: {
                //     DEFAULT: "rgb(0 0 0 / var(--shadow-opactity))",
                //     sm: "rgb(0 0 0 / var(--shadow-opactity))",
                //     md: "rgb(0 0 0 / var(--shadow-opactity))",
                //     lg: "rgb(0 0 0 / var(--shadow-opactity))",
                //     xl: "rgb(0 0 0 / var(--shadow-opactity))",
                //     "2xl": "rgb(0 0 0 / var(--shadow-opactity))",
                // },
            },
        },
    }
)

export default shadcnPlugin
