import { ColorForm } from "@/components/forms/color-form"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"

import type { NextPage } from "next"

type ColorPageProps = {
    params: {
        colorId: string
    }
}

const ColorPage: NextPage<ColorPageProps> = async ({ params }) => {
    const color = await prismadb.color.findUnique({
        where: {
            id: params.colorId,
        },
    })

    return (
        <MainDiv>
            <ColorForm initialData={color} />
        </MainDiv>
    )
}

export default ColorPage
