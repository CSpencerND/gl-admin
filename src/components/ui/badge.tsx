import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            base: {
                default: null,
                soft: true,
            },
            variant: {
                default: "border-transparent bg-primary text-primary-foreground",
                secondary: "border-transparent bg-secondary text-secondary-foreground",
                destructive: "border-transparent bg-destructive text-destructive-foreground",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            base: "default",
            variant: "default",
        },
        compoundVariants: [
            {
                base: "default" || null,
                variant: "destructive",
                class: "stroke-foreground text-foreground",
            },
            {
                base: "soft",
                variant: "destructive",
                class: "bg-rose-500/20 text-rose-500",
            },
            {
                base: "soft",
                variant: "secondary",
                class: "bg-cyan-500/20 text-cyan-500",
            },
        ],
    }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, base, ...props }: BadgeProps) {
    return (
        <div
            className={cn(badgeVariants({ variant, base }), className)}
            {...props}
        />
    )
}

export { Badge, badgeVariants }
