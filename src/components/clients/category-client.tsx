import { DataClient } from "@/components/clients/data-client"

import { columns, type CategoryColumn } from "@/components/tables/category/columns"

type CategoryClientProps = {
    data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
    return (
        <DataClient
            data={data}
            columns={columns}
            searchKey="label"
            entityName="Categories"
            entityId="categoryId"
        />
    )
}
