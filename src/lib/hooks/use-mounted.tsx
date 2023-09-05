import { useEffect, useState } from "react"

export function useMounted() {
    const [isMounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            setMounted(true)
        }
    }, [])

    if (!isMounted) return null
}
