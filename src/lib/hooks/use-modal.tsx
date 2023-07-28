import { create } from "zustand"

type UseModalStore = {
    isOpen: boolean
    setOpen: () => void
    setClose: () => void
}

export const useModalStore = create<UseModalStore>()((set) => ({
    isOpen: false,
    setOpen: () => set({ isOpen: true }),
    setClose: () => set({ isOpen: false }),
}))
