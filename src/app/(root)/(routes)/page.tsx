"use client"

import { useModalStore } from "@/lib/hooks/use-modal"
import { useEffect } from "react"

import type { NextPage } from "next"

const SetupPage: NextPage = () => {
    const isOpen = useModalStore((s) => s.isOpen)
    const setOpen = useModalStore((s) => s.setOpen)

    useEffect(() => {
        if (!isOpen) setOpen()
    }, [isOpen, setOpen])

    return null
}

export default SetupPage
