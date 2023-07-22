import plugin from "tailwindcss/plugin"
import { zinc } from "tailwindcss/colors"

const base = zinc

const shadcnPlugin = plugin(
    // add css variable definition to base layer
    function ({ addBase }) {
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
                "--input": "var(--card)",
                "--primary": "240 5.9% 10%",
                "--primary-foreground": "0 0% 98%",
                "--secondary": "240 4.8% 95.9%",
                "--secondary-foreground": "240 5.9% 10%",
                "--accent": "240 4.8% 95.9%",
                "--accent-foreground": "240 5.9% 10%",
                "--destructive": "0 84.2% 60.2%",
                "--destructive-foreground": "0 0% 98%",
                "--ring": "240 5% 64.9%",
                "--radius": "0.5rem",
            },
            ".dark": {
                "--background": base[950],
                "--foreground": base[100],
                "--muted": "240 3.7% 15.9%",
                "--muted-foreground": "240 5% 64.9%",
                "--popover": "240 10% 3.9%",
                "--popover-foreground": "0 0% 98%",
                "--card": base[900],
                "--card-foreground": base[50],
                "--border": "240 3.7% 15.9%",
                "--input": "var(--card)",
                "--primary": "0 0% 98%",
                "--primary-foreground": "240 5.9% 10%",
                "--secondary": "240 3.7% 15.9%",
                "--secondary-foreground": "0 0% 98%",
                "--accent": "240 3.7% 15.9%",
                "--accent-foreground": "0 0% 98%",
                "--destructive": "0 62.8% 30.6%",
                "--destructive-foreground": "0 85.7% 97.3%",
                "--ring": "240 3.7% 15.9%",
            },
        })

        addBase({
            "*": {
                "@apply border-border": {},
            },

            "html, body, :root": { height: "100%" },
            body: {
                "@apply bg-background text-foreground": {},
                "font-feature-settings": `"rlig" 1, "calt" 1`,
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
                    background: "var(--background)",
                    foreground: "var(--foreground)",
                    border: "hsl(var(--border))",
                    input: "var(--input)",
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
                        DEFAULT: "var(--card)",
                        foreground: "var(--card-foreground)",
                    },
                },

                // colors: {
                //     background: "hsl(var(--background))",
                //     foreground: "hsl(var(--foreground))",
                //     border: "hsl(var(--border))",
                //     input: "hsl(var(--input))",
                //     ring: "hsl(var(--ring))",
                //     primary: {
                //         DEFAULT: "hsl(var(--primary))",
                //         foreground: "hsl(var(--primary-foreground))",
                //     },
                //     secondary: {
                //         DEFAULT: "hsl(var(--secondary))",
                //         foreground: "hsl(var(--secondary-foreground))",
                //     },
                //     destructive: {
                //         DEFAULT: "hsl(var(--destructive))",
                //         foreground: "hsl(var(--destructive-foreground))",
                //     },
                //     muted: {
                //         DEFAULT: "hsl(var(--muted))",
                //         foreground: "hsl(var(--muted-foreground))",
                //     },
                //     accent: {
                //         DEFAULT: "hsl(var(--accent))",
                //         foreground: "hsl(var(--accent-foreground))",
                //     },
                //     popover: {
                //         DEFAULT: "hsl(var(--popover))",
                //         foreground: "hsl(var(--popover-foreground))",
                //     },
                //     card: {
                //         DEFAULT: "hsl(var(--card))",
                //         foreground: "hsl(var(--card-foreground))",
                //     },
                // },
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
            },
        },
    }
)

export default shadcnPlugin
