"use client"

import { CreateStoreModal } from "@/components/modals/create-store"

import { useMounted } from "@/lib/hooks/mounted"

export const ModalProvider = () => {
    useMounted()

    return (
        <>
            <CreateStoreModal></CreateStoreModal>
        </>
    )
}
