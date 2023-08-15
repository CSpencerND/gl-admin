"use client"

import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CopyIcon, MoreHorizontalIcon, PenSquareIcon, TrashIcon } from "lucide-react"

import { useLoading } from "@/lib/hooks/use-loading"
import { useOpen } from "@/lib/hooks/use-open"
import { useToast } from "@/lib/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"

import axios from "axios"

import type { CategoryColumn } from "@/components/tables/category-columns"
import type { StoreParams } from "@/types"

type CellActionProps = {
    data: CategoryColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter()
    const { storeId } = useParams() as StoreParams["params"]
    const { isLoading, setLoading, setLoaded } = useLoading()
    const { isOpen, setOpen, setClosed } = useOpen()
    const { toast } = useToast()

    const onDelete = async () => {
        try {
            setLoading()

            await axios.delete(`/api/${storeId}/categories/${data.id}`)

            router.refresh()

            toast({
                title: "Category Deleted Successfully",
            })
        } catch (error) {
            toast({
                title: "You must remove all categories associated with this billboards first",
            })
        } finally {
            setLoaded()
            setClosed()
        }
    }

    const onCopy = () => {
        navigator.clipboard.writeText(data.id)
    }

    return (
        <>
            <AlertModal
                isOpen={isOpen}
                onClose={setClosed}
                onConfirm={onDelete}
                isLoading={isLoading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="float-right"
                    >
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="sr-only">Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={onCopy}>
                        <CopyIcon className="size-sm mr-2" />
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${storeId}/categories/${data.id}`)}>
                        <PenSquareIcon className="size-sm mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={setOpen}>
                        <TrashIcon className="size-sm mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
