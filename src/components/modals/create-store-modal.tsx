"use client"

import { Modal } from "@/components/ui/modal"
import { CreateStoreForm } from "@/components/forms/store-form"

import { useModalStore } from "@/lib/hooks/use-modal"

export const CreateStoreModal = () => {
    const isOpen = useModalStore((s) => s.isOpen)
    const setClosed = useModalStore((s) => s.setClosed)

    return (
        <Modal
            title="Create a store"
            description="Just give it a name for now"
            isOpen={isOpen}
            onClose={setClosed}
        >
            <CreateStoreForm />
        </Modal>
    )
}
