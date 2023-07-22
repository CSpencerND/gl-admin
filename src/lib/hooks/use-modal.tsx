import { create } from "zustand"

type useModalStore = {
    isOpen: boolean
    setOpen: () => void
    setClose: () => void
}

export const useModal = create<useModalStore>()((set) => ({
    isOpen: false,
    setOpen: () => set({ isOpen: true }),
    setClose: () => set({ isOpen: false }),
}))
