import { useState, useCallback } from "react"

export const useOpen = (open?: boolean) => {
    const [isOpen, setOpenState] = useState<boolean>(open ?? false)

    const setOpen = useCallback(() => setOpenState(true), [])
    const setClosed = useCallback(() => setOpenState(false), [])
    const toggleOpen = useCallback(() => setOpenState((prev) => !prev), [])

    return { isOpen, setOpen, setClosed, toggleOpen, setOpenState }
}
