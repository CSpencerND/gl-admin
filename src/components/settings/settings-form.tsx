"use client"

import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"

import type { Store } from "@prisma/client"
import { TrashIcon } from "lucide-react"

type SettingsFormProps = {
    initialData: Store
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    return (
        <div className="flex items-center justify-between">
            <Heading title="Settings" description="Manage store preferences" />
            <Button
                variant="destructive"
                size="icon"
                onClick={() => { }}
            >
                <TrashIcon className="stroke-[3] size-md" />
            </Button>
        </div>
    )
}
