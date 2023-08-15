"use client"

import { useEffect, useState } from "react"

export function useMounted() {
    const [isMounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!isMounted) return null
}
