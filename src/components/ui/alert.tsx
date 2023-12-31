import * as React from "react"

import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const alertVariants = cva(
    // "relative w-full rounded-lg border p-4 [&>svg~*]:pl-9 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:text-foreground",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
                warning: "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> &
        VariantProps<typeof alertVariants> & {
            asChild?: boolean
        }
>(({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
        <Comp
            ref={ref}
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        />
    )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement> & {
        asChild?: boolean
    }
>(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h5"
    return (
        <Comp
            ref={ref}
            className={cn("mb-1 font-medium leading-none tracking-tight", className)}
            {...props}
        />
    )
})
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement> & {
        asChild?: boolean
    }
>(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h5"
    return (
        <Comp
            ref={ref}
            className={cn("text-sm [&>*]:leading-relaxed", className)}
            {...props}
        />
    )
})
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription, AlertTitle }
