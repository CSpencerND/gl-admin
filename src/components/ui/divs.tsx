type DivProps = React.HTMLAttributes<HTMLDivElement>

import { cn } from "@/lib/utils"

export const MainDiv: React.FC<DivProps> = ({ className, ...props }) => (
    <main className={cn("container p-8 my-4 space-y-16 max-w-5xl", className)} {...props} />
)

export const SectionDiv: React.FC<DivProps> = ({ className, ...props }) => (
    <section className={cn("space-y-8", className)} {...props} />
)
