"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

import { useTheme } from "next-themes"
import { useHydrated } from "@/lib/hooks"

export function ThemeToggler() {
    const { setTheme, theme } = useTheme()

    const hydrated = useHydrated()
    if (!hydrated) return null

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
