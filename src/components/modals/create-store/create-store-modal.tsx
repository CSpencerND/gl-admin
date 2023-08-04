"use client"

import { Modal } from "@/components/ui/modal"
import { CreateStoreForm } from "./_create-store-form"

import { useModalStore } from "@/lib/hooks/use-modal"

export const CreateStoreModal = () => {
    const isOpen = useModalStore((s) => s.isOpen)
    const setClose = useModalStore((s) => s.setClose)

    return (
        <Modal
            title="Create store"
            description="Add a new store and manage products"
            isOpen={isOpen}
            onClose={setClose}
        >
            <CreateStoreForm />
        </Modal>
    )
}
