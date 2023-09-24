import { FancySpinner } from "@/components/ui/spinner"

export default function Loading() {
    return (
        <div className="text-3xl grid place-items-center h-full">
            <FancySpinner
                size={96}
            />
        </div>
    )
}
