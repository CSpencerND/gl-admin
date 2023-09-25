import { Modal } from "@/components/ui/modal"
import { ColorPicker as ColorPickerComponent, useColor } from "react-color-palette"
import "react-color-palette/css"

import { useHydrated } from "@/lib/hooks"
import { create } from "zustand"

type UseColorPicker = {
    isShowColorPicker: boolean
    openColorPicker: () => void
    closeColorPicker: () => void
    color: string
    setColor: (e: string) => void
}

export const useColorPicker = create<UseColorPicker>()((set) => ({
    isShowColorPicker: false,
    openColorPicker: () => set({ isShowColorPicker: true }),
    closeColorPicker: () => set({ isShowColorPicker: false }),
    color: "#000000",
    setColor: (e: string) => set({ color: e }),
}))

type ColorPickerProps = {
    open: boolean
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ open }) => {
    const color = useColorPicker((s) => s.color)
    const setColor = useColorPicker((s) => s.setColor)
    const closeColorPicker = useColorPicker((s) => s.closeColorPicker)

    const [libColor, libSetColor] = useColor(color)

    const hydrated = useHydrated()
    if (!hydrated) return null

    return (
        <Modal
            isOpen={open}
            onClose={closeColorPicker}
            className="p-0"
        >
            <ColorPickerComponent
                hideAlpha
                hideInput={["rgb", "hsv"]}
                color={libColor}
                onChange={(c) => {
                    libSetColor(c)
                    setColor(c.hex)
                }}
            />
        </Modal>
    )
}
