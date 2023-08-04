import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

type SpinnerProps = React.ComponentProps<typeof Loader2Icon> & {
    isLoading: boolean
}

export const Spinner: React.FC<SpinnerProps> = ({ isLoading, className, ...props }) => {
    return (
        <Loader2Icon
            className={cn(
                "animate-spin size-sm",
                !isLoading ? "hidden" : "",
                className
            )}
            {...props}
        />
    )
}
