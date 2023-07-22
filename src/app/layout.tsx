import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { ClerkProvider } from "@clerk/nextjs"

import { ModalProvider } from "@/components/modals/modal-provider"

import type { Metadata } from "next"

import "@/styles/globals.css"

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
                        <ModalProvider />
                        {children}
                        <TailwindIndicator />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
