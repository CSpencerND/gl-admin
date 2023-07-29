import { useState } from "react"

export const useLoading = () => {
    const [isLoading, setLoadingState] = useState<boolean>(false)

    const setLoading = () => setLoadingState(true)
    const setLoaded = () => setLoadingState(false)

    return { isLoading, setLoading, setLoaded }
}
