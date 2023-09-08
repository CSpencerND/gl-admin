import { DataClient } from "@/components/tables/data-client"
import { BannerColumns } from "@/components/tables/banner-columns"
import { MainDiv } from "@/components/ui/divs"

import prismadb from "@/lib/prismadb"
import { format } from "date-fns"

import type { BannerColumn } from "@/components/tables/banner-columns"
import type { BannerParams } from "@/types"
import type { NextPage } from "next"

type BannersPageProps = BannerParams

const BannersPage: NextPage<BannersPageProps> = async ({ params: { storeId } }) => {
    const banners = await prismadb.banner.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    const formattedBanners: BannerColumn[] = banners.map(({ id, label, createdAt }) => ({
        id,
        label,
        createdAt: format(createdAt, "MMMM do, yyyy"),
    }))

    return (
        <MainDiv>
            <DataClient
                data={formattedBanners}
                columns={BannerColumns}
                searchKey="label"
                entityName="Banners"
                entityIdName="bannerId"
            />
        </MainDiv>
    )
}

export default BannersPage
