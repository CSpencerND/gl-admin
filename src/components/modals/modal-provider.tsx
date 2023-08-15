"use client"

import { CreateStoreModal } from "@/components/modals/create-store-modal"

import { useMounted } from "@/lib/hooks/use-mounted"

export const ModalProvider = () => {
    useMounted()

    return (
        <>
            <CreateStoreModal />
        </>
    )
}
