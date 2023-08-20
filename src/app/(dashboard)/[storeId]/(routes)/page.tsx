import { MainDiv, SectionDiv } from "@/components/ui/divs"

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

    return (
        <MainDiv>
            <SectionDiv>
                Current Store: {store?.name}
            </SectionDiv>
        </MainDiv>
    )
}

export default DashboardPage
