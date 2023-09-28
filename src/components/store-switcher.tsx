"use client"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandItem,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon, StoreIcon } from "lucide-react"

import { useModalStore } from "@/lib/hooks/use-modal"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { cn } from "@/lib/utils"

import type { Store } from "@prisma/client"
import type { StoreParams } from "@/types"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

type StoreSwitcherProps = PopoverTriggerProps & {
    items?: Store[]
}

type StoreItem = {
    label: string
    value: string
}

export const StoreSwitcher: React.FC<StoreSwitcherProps> = ({ className, items = [], ...props }) => {
    const [isOpen, setOpen] = useState<boolean>(false)

    const setModalOpen = useModalStore((s) => s.setOpen)
    const { storeId } = useParams() as StoreParams["params"]
    const router = useRouter()

    const formattedItems: StoreItem[] = items.map((item) => ({
        label: item.name,
        value: item.id,
    }))

    const currentStore = formattedItems.find((item) => item.value === storeId)

    const onStoreSelect = (store: StoreItem) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }

    return (
        <Popover
            open={isOpen}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-label="Select A Store"
                    className={cn("w-72 justify-between bg-background/25", className)}
                >
                    <StoreIcon className="mr-2 size-sm" />
                    <span>{currentStore?.label}</span>
                    <ChevronsUpDownIcon className="ml-auto stroke-muted-foreground size-sm" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="mt-1 overflow-hidden border-none p-0 ring-1 ring-border bg-transparent">
                <Command className="bg-background/60 backdrop-blur-lg backdrop-saturate-150">
                    <CommandList>
                        <CommandInput
                            placeholder="Search stores ..."
                            className="h-12"
                        />
                        <CommandEmpty>No Store Found</CommandEmpty>
                        <CommandGroup>
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                >
                                    <StoreIcon className="mr-2 size-sm" />
                                    {store.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto stroke-muted-foreground size-sm",
                                            currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    setModalOpen()
                                }}
                            >
                                <PlusCircleIcon className="mr-2 size-sm" />
                                <span>Create Store</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
