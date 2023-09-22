"use client"

import * as React from "react"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { useHydrated } from "@/lib/hooks"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const hydrated = useHydrated()

    if (!hydrated) return null

    return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}
