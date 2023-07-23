"use client"

import { Modal } from "@/components/ui/modal"
import { CreateProjectForm } from "@/components/modals/create-project-form"

import { useModal } from "@/lib/hooks/use-modal"

export const CreateProjectModal = () => {
    const isOpen = useModal((s) => s.isOpen)
    const setClose = useModal((s) => s.setClose)

    return (
        <Modal
            title="Create project"
            description="Add a new store and manage products"
            isOpen={isOpen}
            onClose={setClose}
        >
            <CreateProjectForm />
        </Modal>
    )
}
