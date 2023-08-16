import { cn } from "@/lib/utils"

type HeadingProps = React.HTMLAttributes<HTMLDivElement> & {
    title: string
    description: string
}

export const Heading: React.FC<HeadingProps> = ({ title, description, className, ...props }) => {
    return (
        <header className={cn("prose dark:prose-invert prose-headings:mb-1.5", className)} {...props}>
            <h2>{title}</h2>
            <p>{description}</p>
        </header>
    )
}
