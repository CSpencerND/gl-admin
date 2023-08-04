"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CopyIcon } from "lucide-react"

import { useOpen } from "@/lib/hooks/open"
import { useState } from "react"

type CopyButtonProps = {
    content: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ content }) => {
    const { isOpen, setOpen, setClose } = useOpen()

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
                    setClose()
                    setTimeout(() => setTooltipText("Copy"), 1000)
                }, 1000)
            })
    }

    let hoverTimeout: NodeJS.Timeout
    let leaveTimeout: NodeJS.Timeout

    const onEnter = () => {
        clearTimeout(leaveTimeout)
        hoverTimeout = setTimeout(() => {
            setOpen()
        }, 700)
    }

    const onLeave = () => {
        clearTimeout(hoverTimeout)
        leaveTimeout = setTimeout(() => {
            setClose()
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
                        className="h-fit w-fit p-1.5"
                    >
                        <CopyIcon className="size-xs" />
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
