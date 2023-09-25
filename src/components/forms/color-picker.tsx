import { Modal } from "@/components/ui/modal"
import { Hue, Saturation, useColor, type IColor } from "react-color-palette"
import "react-color-palette/css"

import { useHydrated } from "@/lib/hooks"
import { useCallback, useEffect } from "react"
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
    color: "#ff0000",
    setColor: (e: string) => set({ color: e }),
}))

type ColorPickerProps = {
    open: boolean
    initialValue: string | undefined
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ open, initialValue }) => {
    const color = useColorPicker((s) => s.color)
    const setColor = useColorPicker((s) => s.setColor)
    const closeColorPicker = useColorPicker((s) => s.closeColorPicker)

    const [libColor, libSetColor] = useColor(color)

    const onColorChange = useCallback(
        (c: IColor) => {
            libSetColor(c)
            setColor(c.hex)
        },
        [libSetColor, setColor]
    )

    useEffect(() => {
        if (!initialValue) return

        const colorObject = {
            hex: initialValue,
            rgb: {},
            hsv: {},
        } as IColor

        onColorChange(colorObject)
    }, [initialValue, onColorChange])

    const hydrated = useHydrated()
    if (!hydrated) return null

    return (
        <Modal
            isOpen={open}
            onClose={closeColorPicker}
        >
            <Saturation
                height={384}
                color={libColor}
                onChange={onColorChange}
            />
            <Hue
                color={libColor}
                onChange={onColorChange}
            />
        </Modal>
    )
}
