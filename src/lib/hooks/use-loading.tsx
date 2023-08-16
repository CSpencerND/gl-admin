import { useState } from "react"

export const useLoading = (loading?: boolean) => {
    const [isLoading, setLoadingState] = useState<boolean>(loading ?? false)

    const setLoading = () => setLoadingState(true)
    const setLoaded = () => setLoadingState(false)

    return { isLoading, setLoading, setLoaded, setLoadingState }
}
