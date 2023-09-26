"use client"

import { Loader2Icon } from "lucide-react"
import Loader from "react-spinners/BeatLoader"
import BigLoader from "react-spinners/PacmanLoader"

import { primaryColor } from "@/constants"
import { cn } from "@/lib/utils"

type FancySpinnerProps = React.ComponentProps<typeof Loader> & {
    isLoading?: boolean
    color?: string
}

export const FancySpinner: React.FC<FancySpinnerProps> = ({ isLoading = true, size = 14, color, ...props }) => {
    return (
        <Loader
            loading={isLoading}
            size={size}
            color={color}
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
            className={cn("animate-spin size-sm stroke-current fill-current", !isLoading ? "hidden" : "", className)}
            {...props}
        />
    )
}

export const PageLoader = () => {
    return (
        <div className="text-3xl grid place-items-center h-full">
            <div aria-label="loading">
                <BigLoader
                    size={24}
                    color={primaryColor}
                />
            </div>
        </div>
    )
}
