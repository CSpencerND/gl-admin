import { useState, useCallback } from "react"

export const useLoading = (loading?: boolean) => {
    const [isLoading, setLoadingState] = useState<boolean>(loading ?? false)

    const setLoading = useCallback(() => setLoadingState(true), [])
    const setLoaded = useCallback(() => setLoadingState(false), [])
    const toggleLoading = useCallback(() => setLoadingState((prev) => !prev), [])

    return { isLoading, setLoading, setLoaded, toggleLoading, setLoadingState }
}
