import { DataClient } from "@/components/clients/data-client"

import { BillboardColumns, type BillboardColumn } from "@/components/tables/billboard-columns"

type BillboardClientProps = {
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
    return (
        <DataClient
            data={data}
            columns={BillboardColumns}
            searchKey="label"
            entityName="Billboards"
            entityId="billboardId"
        />
    )
}
