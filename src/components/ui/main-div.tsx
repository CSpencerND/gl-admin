import { cn } from "@/lib/utils"

export function MainDiv({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <main className={cn("container p-8 my-4", className)} {...props} />
    )
}