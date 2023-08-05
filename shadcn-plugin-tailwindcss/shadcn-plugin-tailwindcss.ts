import plugin from "tailwindcss/plugin"
import theme from "./themes/kanagawa"

export default plugin(
    function({ addBase, addUtilities }) {
        addBase(theme)

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
