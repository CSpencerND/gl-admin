import { ModalProvider } from "@/components/modals/modal-provider"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs"

import type { Metadata } from "next"

import { theme } from "@/constants"
import { dark } from "@clerk/themes"
import "./globals.css"

import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "GLE Dashboard",
    description: "Gryffyn Labs Ecommerce Admin Dashboard",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                variables: {
                    colorPrimary: theme.primary,
                },
            }}
        >
            <html
                lang="en"
                className="dark"
                style={{ colorScheme: "dark" }}
            >
                <body className={inter.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <Toaster />
                        <ModalProvider />
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
