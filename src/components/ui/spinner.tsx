import Loader from "react-spinners/BeatLoader"

import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

type FancySpinnerProps = React.ComponentProps<typeof Loader> & {
    isLoading?: boolean
}

export const FancySpinner: React.FC<FancySpinnerProps> = ({ isLoading = true, size = 14, ...props }) => {
    return (
        <Loader
            loading={isLoading}
            size={size}
            {...props}
        />
    )
}

type SpinnerProps = React.ComponentProps<typeof Loader2Icon> & {
    isLoading: boolean
}

export const Spinner: React.FC<SpinnerProps> = ({ isLoading, className, ...props }) => {
    return (
        <Loader2Icon
            className={cn("animate-spin size-sm", !isLoading ? "hidden" : "", className)}
            {...props}
        />
    )
}
