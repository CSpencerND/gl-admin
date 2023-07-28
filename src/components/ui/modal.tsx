"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { cn } from "@/lib/utils"

type ModalProps = React.PropsWithChildren & {
    title: string
    description: string
    isOpen: boolean
    onClose: () => void
    className?: string
}

export const Modal: React.FC<ModalProps> = (props) => {
    const { title, description, isOpen, onClose, children, className } = props

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
            <DialogContent asModal
                className={cn(className)}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}
