"use client"

import { CreateProjectModal } from "@/components/modals/create-project-modal"

import { useMounted } from "@/lib/hooks/mounted"

export const ModalProvider = () => {
    useMounted()

    return (
        <>
            <CreateProjectModal></CreateProjectModal>
        </>
    )
}
