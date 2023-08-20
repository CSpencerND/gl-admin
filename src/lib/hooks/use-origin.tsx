import { useState, useEffect } from "react"

export const useOrigin = () => {
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return ""
    }

    if (typeof window === "undefined") {
        return ""
    }

    return window.location.origin
}
