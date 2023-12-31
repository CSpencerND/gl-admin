import { Button } from "@/components/ui/button"
import { FancySpinner } from "@/components/ui/spinner"

type SubmitButtonProps = {
    isSubmitting: boolean
    submitActionText: "Save Changes" | "Confirm" | "Continue"
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, submitActionText }) => {
    return (
        <Button
            disabled={isSubmitting}
            type="submit"
        >
            {isSubmitting ? <FancySpinner isLoading={isSubmitting} className="stroke-current fill-current" /> : submitActionText}
        </Button>
    )
}
