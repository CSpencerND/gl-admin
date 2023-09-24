"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangleIcon as AlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type ModalProps = React.PropsWithChildren & {
    title: string
    description: string
    icon?: React.ReactNode
    asAlert?: boolean
    isOpen: boolean
    onClose: () => void
    className?: string
}

export const Modal: React.FC<ModalProps> = (props) => {
    const { title, description, icon, asAlert, isOpen, onClose, children, className } = props

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
                className={cn("!prose dark:!prose-invert p-8 prose-headings:!mt-0 prose-h2:!mb-1.5 bg-card", className)}
            >
                {!asAlert ? (
                    <DialogHeader>
                        <DialogTitle className="flex flex-row gap-4">
                            {icon}
                            {title}
                        </DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                ) : (
                    <Alert variant="warning" className="border-none p-0 space-x-4">
                        {!icon ? <AlertIcon className="size-xl " /> : icon}
                        <AlertTitle className="text-2xl mb-1.5">{title}</AlertTitle>
                        <AlertDescription className="text-base text-muted-foreground">{description}</AlertDescription>
                    </Alert>
                )}
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}
