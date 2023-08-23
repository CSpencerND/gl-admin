import { useToast } from "."

export const useCopy = (content: string, contentName: string) => {
    const { toast } = useToast()

    const onCopyContent = async () => {
        try {
            navigator.clipboard.writeText(content)
            toast({
                title: `${contentName} Copied To Clipboard`,
            })
        } catch (error) {
            toast({
                title: "Copy Failed",
                description: `${error}`,
            })
        }
    }
    return { onCopyContent, content, contentName }
}
