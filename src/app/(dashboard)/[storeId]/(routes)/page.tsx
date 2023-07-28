import { Main } from "@/components/ui/main"

import prismadb from "@/lib/prismadb"

type DashProps = {
    params: { storeId: string }
}

const DashboardPage: React.FC<DashProps> = async ({ params }) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        },
    })

    return <Main><div>Active Store: {store?.name}</div></Main>
}

export default DashboardPage
