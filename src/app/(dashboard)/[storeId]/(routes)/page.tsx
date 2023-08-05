import { MainDiv } from "@/components/ui/main-div"

import prismadb from "@/lib/prismadb"

import type { NextPage } from "next"

type DashProps = {
    params: { storeId: string }
}

const DashboardPage: NextPage<DashProps> = async ({ params }) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        },
    })

    return <MainDiv><section>Active Store: {store?.name}</section></MainDiv>
}

export default DashboardPage
