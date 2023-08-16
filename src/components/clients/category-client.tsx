import { DataClient } from "@/components/clients/data-client"

import { CategoryColumns, type CategoryColumn } from "@/components/tables/category-columns"

type CategoryClientProps = {
    data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
    return (
        <DataClient
            data={data}
            columns={CategoryColumns}
            searchKey="label"
            entityName="Categories"
            entityIdName="categoryId"
        />
    )
}
