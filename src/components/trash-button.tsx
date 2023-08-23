import { Button, ButtonProps } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { TrashIcon } from "lucide-react"

type TrashButtonProps = ButtonProps

export const TrashButton: React.FC<TrashButtonProps> = ({ disabled, onClick, ...props }) => {
    return (
        <Button
            type="button"
            // base="soft"
            variant="destructive"
            size="icon"
            disabled={disabled}
            onClick={onClick}
            className="disabled:!opacity-100 backdrop-blur"
            {...props}
        >
            {disabled ? <Spinner isLoading={disabled} /> : <TrashIcon className="stroke-[3] size-sm" />}
        </Button>
    )
}
