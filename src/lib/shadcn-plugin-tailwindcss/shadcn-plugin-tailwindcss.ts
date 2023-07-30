import plugin from "tailwindcss/plugin"
import { tw2hsl, hex2hsl } from "./converters"

import { slate as baseColor, rose as destr } from "tailwindcss/colors"

const base = tw2hsl(baseColor)

const shadcnPlugin = plugin(
    // add css variable definition to base layer
    function({ addBase, addUtilities }) {
        addBase({
            ":root": {
                "--background": base[100],
                "--foreground": base[950],
                "--muted": "240 4.8% 95.9%",
                "--muted-foreground": "240 3.8% 46.1%",
                "--popover": "0 0% 100%",
                "--popover-foreground": "240 10% 3.9%",
                "--card": base[50],
                "--card-foreground": base[900],
                "--border": "240 5.9% 90%",
                "--input": "240 5.9% 90%",
                "--primary": base[950],
                "--primary-foreground": base[50],
                "--secondary": "240 4.8% 95.9%",
                "--secondary-foreground": "240 5.9% 10%",
                "--accent": "240 4.8% 95.9%",
                "--accent-foreground": "240 5.9% 10%",
                "--destructive": hex2hsl(destr[600]),
                "--destructive-foreground": hex2hsl(destr[600]),
                "--ring": "240 5% 64.9%",
                "--radius": "0.5rem",
            },
            ".dark": {
                "--background": base[950],
                "--foreground": base[100],
                "--muted": base[800],
                "--muted-foreground": base[400],
                "--popover": base[950],
                "--popover-foreground": base[100],
                "--card": base[950],
                "--card-foreground": base[100],
                "--border": base[800],
                "--input": base[800],
                "--ring": base[700],
                "--primary": base[50],
                "--primary-foreground": base[950],
                "--secondary": base[800],
                "--secondary-foreground": base[100],
                "--accent": base[800],
                "--accent-foreground": base[100],
                "--destructive": hex2hsl(destr[600]),
                "--destructive-foreground": hex2hsl(destr[600]),
            },
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
            ".size-sm": {
                "@apply w-4 h-4": {}
            },

            ".size-md": {
                "@apply w-5 h-5": {}
            },

            ".size-lg": {
                "@apply w-6 h-6": {}
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
                        DEFAULT: "hsl(var(--destructive) / 0.25)",
                        foreground: "hsl(var(--destructive-foreground))",
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
                    top: "0 -15px 40px -10px rgb(0 0 0 / 0.25)"
                    // top: "0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 -4px 6px -4px rgb(0 0 0 / 0.1)"
                }
            },
        },
    }
)

export default shadcnPlugin
