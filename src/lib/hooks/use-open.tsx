import { useState } from "react"

export const useOpen = (open?: boolean) => {
    const [isOpen, setOpenState] = useState<boolean>(open ?? false)

    const setOpen = () => setOpenState(true)
    const setClosed = () => setOpenState(false)

    return { isOpen, setOpen, setClosed, setOpenState }
}
