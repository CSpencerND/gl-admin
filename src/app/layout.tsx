// TODO: ADD tRPC?

import { ModalProvider } from "@/components/modals/modal-provider"
import { TailwindIndicator } from "@/components/theme/tailwind-indicator"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs"

import type { Metadata } from "next"

import "./globals.css"

import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "GL | Admin Dashboard",
    description: "Gryffyn Labs Ecommerce Admin Dashboard",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html
                lang="en"
                suppressHydrationWarning
            >
                <body className={inter.className}>
                    <ThemeProvider attribute="class">
                        <Toaster />
                        <ModalProvider />
                        {children}
                        <TailwindIndicator />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
