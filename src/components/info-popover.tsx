import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { InfoIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type InfoPopoverProps = React.ComponentProps<typeof PopoverContent> & {
    className: string
}

export const InfoPopover: React.FC<InfoPopoverProps> = (props) => {
    const { side, sideOffset, align, alignOffset, className, children } = props

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className={cn("size-3xl", className)}
                >
                    <InfoIcon className="size-xs" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                asChild
                side={side ?? "top"}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
            >
                {children}
            </PopoverContent>
        </Popover>
    )
}
