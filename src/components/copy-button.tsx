"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { useOpen } from "@/lib/hooks/use-open"
import { useState } from "react"

type CopyButtonProps = {
    content: string
    label?: string
    asDropdownItem?: boolean
    buttonClassName?: string
    iconClassName?: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({
    content,
    label,
    asDropdownItem,
    buttonClassName,
    iconClassName,
}) => {
    const { isOpen, setOpen, setClosed } = useOpen()

    const [tooltipText, setTooltipText] = useState<string>("Copy")

    const onCopy = () => {
        navigator.clipboard
            .writeText(content)
            .then(() => {
                setTooltipText("Copied!")
            })
            .catch((error) => {
                setTooltipText("Copy failed: " + error.message)
            })
            .finally(() => {
                setOpen()
                setTimeout(() => {
                    setClosed()
                    setTimeout(() => setTooltipText("Copy"), 1000)
                }, 1000)
            })
    }

    let hoverTimeout: NodeJS.Timeout
    let leaveTimeout: NodeJS.Timeout

    const onEnter = () => {
        if (asDropdownItem) return

        clearTimeout(leaveTimeout)
        hoverTimeout = setTimeout(() => {
            setOpen()
        }, 700)
    }

    const onLeave = () => {
        if (asDropdownItem) return

        clearTimeout(hoverTimeout)
        leaveTimeout = setTimeout(() => {
            setClosed()
            setTimeout(() => setTooltipText("Copy"), 200)
        }, 200)
    }

    return (
        <TooltipProvider>
            <Tooltip open={isOpen}>
                <TooltipTrigger
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                    onFocus={onEnter}
                    onBlur={onLeave}
                    asChild
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onCopy}
                        className={cn(
                            asDropdownItem
                                ? "w-full h-10 justify-normal px-3 py-2 relative flex cursor-pointer select-none items-center rounded-sm text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                : "h-fit w-fit p-1.5",
                            buttonClassName
                        )}
                    >
                        <CopyIcon className={cn("size-xs", label ? "mr-2 size-sm" : "", iconClassName)} />
                        {label}
                    </Button>
                </TooltipTrigger>
                <TooltipContent
                    className="origin-[--radix-tooltip-content-transform-origin]"
                    role="tooltip"
                    align="end"
                >
                    <p>{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
