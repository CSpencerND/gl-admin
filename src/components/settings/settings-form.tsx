"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { TrashIcon } from "lucide-react"

import type { Store } from "@prisma/client"

type SettingsFormProps = {
    initialData: Store
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    return (
        <>
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
            <Separator />
        </>
    )
}
