"use client"

import {
    type ToastProps,
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast"

import { useToast } from "@/components/ui/use-toast"

export const Toaster: React.FC<ToastProps> = ({ duration = 3000 }) => {
    const { toasts } = useToast()

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, ...props }) {
                return (
                    <Toast
                        duration={duration}
                        className="bg-opacity-60 backdrop-blur"
                        key={id}
                        {...props}
                    >
                        <div className="grid gap-1">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && <ToastDescription>{description}</ToastDescription>}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                )
            })}
            <ToastViewport />
        </ToastProvider>
    )
}
