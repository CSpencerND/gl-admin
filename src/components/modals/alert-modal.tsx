"use client"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { Spinner } from "@/components/ui/spinner"

import { useMounted } from "@/lib/hooks/use-mounted"

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
            title="Heads Up!"
            description="This Action Cannot Be Undone"
            asAlert
            isOpen={isOpen}
            onClose={onClose}
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
                    variant="destructive"
                    disabled={isLoading}
                    onClick={onConfirm}
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
