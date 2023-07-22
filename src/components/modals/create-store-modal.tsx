"use client"

import { Modal } from "@/components/ui/modal"

import { useModal } from "@/lib/hooks/use-modal"

export const CreateStoreModal = () => {
    const isOpen = useModal((s) => s.isOpen)
    const setClose = useModal((s) => s.setClose)

    return (
        <Modal
            title="Create project"
            description="Add a new store and manage products"
            isOpen={isOpen}
            onClose={setClose}
        >
            Future Create Store Form
        </Modal>
    )
}
