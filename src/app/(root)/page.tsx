"use client"

import { useModal } from "@/lib/hooks/use-modal"
import { useEffect } from "react"

import { UserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export default function SetupPage() {
    const isOpen = useModal((s) => s.isOpen)
    const setOpen = useModal((s) => s.setOpen)

    useEffect(() => {
        if (!isOpen) setOpen()
    }, [isOpen, setOpen])

    return (
        <main className="p-8 space-y-12">
            <div className="flex justify-between items-center">
                <p className="text-lg font-medium">Home</p>
                <UserButton appearance={{baseTheme: dark}} />
            </div>
        </main>
    )
}
