import { BillboardForm } from "@/components/forms/billboard-form"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"

import type { NextPage } from "next"

type BillboardPageProps = {
    params: {
        billboardId: string
    }
}

const BillboardPage: NextPage<BillboardPageProps> = async ({ params: { billboardId: id } }) => {
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id,
        },
        include: {
            source: {
                select: {
                    key: true,
                    name: true,
                    url: true,
                    size: true,
                },
            },
        },
    })

    return (
        <MainDiv>
            <BillboardForm
                initialData={billboard}
                entityName="Billboard"
                routeSegment="billboards"
            />
        </MainDiv>
    )
}

export default BillboardPage
