import { SizeForm } from "@/components/forms/size-form"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"

import type { NextPage } from "next"

type SizePageProps = {
    params: {
        sizeId: string
    }
}

const SizePage: NextPage<SizePageProps> = async ({ params }) => {
    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId,
        },
    })

    return (
        <MainDiv>
            <SizeForm initialData={size} />
        </MainDiv>
    )
}

export default SizePage
