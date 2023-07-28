"use client"

import { useModalStore } from "@/lib/hooks/use-modal"
import { useEffect } from "react"

export default function SetupPage() {
    const isOpen = useModalStore((s) => s.isOpen)
    const setOpen = useModalStore((s) => s.setOpen)

    useEffect(() => {
        if (!isOpen) setOpen()
    }, [isOpen, setOpen])

    return null
}
