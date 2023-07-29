import { useState } from "react"

export const useOpen = () => {
    const [isOpen, setOpenState] = useState<boolean>(false)

    const setOpen = () => setOpenState(true)
    const setClose = () => setOpenState(false)

    return { isOpen, setOpen, setClose }
}
