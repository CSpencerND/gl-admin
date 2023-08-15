import { useState } from "react"

export const useOpen = () => {
    const [isOpen, setOpenState] = useState<boolean>(false)

    const setOpen = () => setOpenState(true)
    const setClosed = () => setOpenState(false)

    return { isOpen, setOpen, setClosed, setOpenState }
}
