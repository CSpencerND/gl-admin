"use client"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { Spinner } from "@/components/ui/spinner"
import { AlertTriangleIcon as AlertIcon } from "lucide-react"

import { useMounted } from "@/lib/hooks/mounted"

type AlertModalProps = {
    isOpen: boolean
    isLoading: boolean
    onClose: () => void
    onConfirm: () => void
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, isLoading, onClose, onConfirm }) => {
    useMounted()

    return (
        <Modal
            title="Are You Sure?"
            description="This Action Cannot Be Undone"
            isOpen={isOpen}
            onClose={onClose}
            icon={<AlertIcon className="stroke-warning-foreground size-xl" />}
            // className="bg-card"
        >
            <div className="flex w-full items-center justify-end space-x-2 pt-8">
                <Button
                    disabled={isLoading}
                    onClick={onClose}
                    variant="outline"
                >
                    Cancel
                </Button>
                <Button
                    disabled={isLoading}
                    onClick={onConfirm}
                    variant="destructive"
                >
                    <Spinner
                        isLoading={isLoading}
                        className="mr-2"
                    />
                    Continue
                </Button>
            </div>
        </Modal>
    )
}
