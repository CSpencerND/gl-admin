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

import { useCopy } from "@/lib/hooks"
import { useLoading } from "@/lib/hooks/use-loading"
import { useOpen } from "@/lib/hooks/use-open"
import { useToast } from "@/lib/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"

import axios from "axios"

import type { ColumnType, StoreParams } from "@/types"

type CellActionProps<TColumn extends ColumnType> = {
    data: TColumn
    entityName: string
    pathSegment: string
}

export function CellAction<TColumn extends ColumnType>(props: CellActionProps<TColumn>) {
    const { data, entityName, pathSegment } = props

    const router = useRouter()
    const { storeId } = useParams() as StoreParams["params"]
    const { isLoading, setLoading, setLoaded } = useLoading()
    const { isOpen, setOpen, setClosed } = useOpen()
    const { onCopyContent, contentName } = useCopy(data.id, "ID")
    const { toast } = useToast()

    const onDelete = async () => {
        try {
            setLoading()

            await axios.delete(`/api/${storeId}/${pathSegment}/${data.id}`)

            router.refresh()

            toast({
                title: `${entityName} Deleted Successfully`,
            })
        } catch (error) {
            toast({
                title: `You must remove all other data associated with this ${entityName} first`,
            })
        } finally {
            setLoaded()
            setClosed()
        }
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
                    <DropdownMenuItem onClick={onCopyContent}>
                        <CopyIcon className="size-sm mr-2" />
                        Copy {contentName}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${storeId}/${pathSegment}/${data.id}`)}>
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
