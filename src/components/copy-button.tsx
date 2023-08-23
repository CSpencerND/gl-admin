import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CopyIcon } from "lucide-react"

import { useCopy } from "@/lib/hooks"

import { cn } from "@/lib/utils"

type CopyButtonProps = React.ComponentProps<typeof Button> & {
    content: string
    contentName: string
    withoutTooltip?: boolean
}

export const CopyButton: React.FC<CopyButtonProps> = ({ content, contentName, withoutTooltip = false, className }) => {
    const { onCopyContent } = useCopy(content, contentName)

    if (withoutTooltip) {
        return (
            <Button
                variant="ghost"
                size="icon"
                onClick={onCopyContent}
                className={cn("rounded-sm size-xl backdrop-blur-sm", className)}
            >
                <CopyIcon className="size-xs" />
            </Button>
        )
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onCopyContent}
                        className={cn("rounded-sm size-xl backdrop-blur-sm", className)}
                    >
                        <CopyIcon className="size-xs" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent
                    className="origin-[--radix-tooltip-content-transform-origin]"
                    role="tooltip"
                    align="end"
                >
                    <p>Copy {contentName}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
