"use client"

import { useModal } from "@/lib/hooks/use-modal"
import { useEffect } from "react"

export default function SetupPage() {
    const isOpen = useModal((s) => s.isOpen)
    const setOpen = useModal((s) => s.setOpen)

    useEffect(() => {
        if (!isOpen) setOpen()
    }, [isOpen, setOpen])

    return <main className="p-8 space-y-12">Root Page</main>
}
