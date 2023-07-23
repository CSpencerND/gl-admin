"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type ModalProps = React.PropsWithChildren & {
    title: string
    description: string
    isOpen: boolean
    onClose: () => void
}

export const Modal: React.FC<ModalProps> = (props) => {
    const { title, description, isOpen, onClose, children } = props

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onChange}
        >
            <DialogContent asModal>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}
