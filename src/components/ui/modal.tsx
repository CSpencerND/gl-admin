"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { cn } from "@/lib/utils"

type ModalProps = React.PropsWithChildren & {
    title: string
    description: string
    icon?: React.ReactNode
    isOpen: boolean
    onClose: () => void
    className?: string
}

export const Modal: React.FC<ModalProps> = (props) => {
    const { title, description, icon, isOpen, onClose, children, className } = props

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
            <DialogContent
                asModal
                className={cn("!prose dark:!prose-invert p-8 prose-headings:!mt-0", className)}
            >
                <DialogHeader>
                    <DialogTitle className="flex flex-row gap-4">
                        {icon}
                        {title}
                    </DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}
