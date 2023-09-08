import { BannerForm } from "@/components/forms/banner-form"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"

import type { NextPage } from "next"

type BannerPageProps = {
    params: {
        bannerId: string
    }
}

const BannerPage: NextPage<BannerPageProps> = async ({ params: { bannerId: id } }) => {
    const banner = await prismadb.banner.findUnique({
        where: {
            id,
        },
    })

    return (
        <MainDiv>
            <BannerForm
                initialData={banner}
                entityName="Banner"
                routeSegment="banners"
                dependentEntity="Categories"
            />
        </MainDiv>
    )
}

export default BannerPage
