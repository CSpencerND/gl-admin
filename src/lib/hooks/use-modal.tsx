import { create } from "zustand"

type UseModalStore = {
    isOpen: boolean
    setOpen: () => void
    setClosed: () => void
}

export const useModalStore = create<UseModalStore>()((set) => ({
    isOpen: false,
    setOpen: () => set({ isOpen: true }),
    setClosed: () => set({ isOpen: false }),
}))
