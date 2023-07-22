"use client"

import { CreateStoreModal } from "@/components/modals/create-store-modal"

import { useMounted } from "@/lib/hooks/mounted"

export const ModalProvider = () => {
    useMounted()

    return (
        <>
            <CreateStoreModal></CreateStoreModal>
        </>
    )
}
