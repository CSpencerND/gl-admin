import { Button, ButtonProps } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"

type TrashButtonProps = ButtonProps & {
}

export const TrashButton: React.FC<TrashButtonProps> = ({ disabled, onClick, ...props }) => {
    return (
        <Button
            // base="soft"
            variant="destructive"
            size="icon"
            disabled={disabled}
            type="button"
            onClick={onClick}
            {...props}
        >
            <TrashIcon className="stroke-[3] size-sm" />
        </Button>
    )
}
