import { Overview, OverviewStyleToggle } from "@/components/overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MainDiv, SectionDiv } from "@/components/ui/divs"
import { Heading } from "@/components/ui/heading"
import { CreditCardIcon, DollarSignIcon, PackageIcon } from "lucide-react"

import { getGraphRevenue, getSalesCount, getStockCount, getTotalRevenue } from "@/lib/actions"
import { formatPrice } from "@/lib/utils"

import type { StoreParams } from "@/types"
import type { NextPage } from "next"

type DashProps = StoreParams

const DashboardPage: NextPage<DashProps> = async ({ params: { storeId } }) => {
    const totalRevenue = await getTotalRevenue(storeId)
    const salesCount = await getSalesCount(storeId)
    const stockCount = await getStockCount(storeId)
    const graphRevenue = await getGraphRevenue(storeId)

    return (
        <MainDiv>
            <Heading
                title="Dashboard"
                description="Overview of your store"
            />

            <SectionDiv>
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSignIcon className="size-xs text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
                        </CardContent>
                    </Card>

                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sales</CardTitle>
                            <CreditCardIcon className="size-xs text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+{salesCount}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
                            <PackageIcon className="size-xs text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stockCount}</div>
                        </CardContent>
                    </Card>
                </div>
            </SectionDiv>

            <SectionDiv>
                <div className="grid gap-4 grid-cols-3">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                Overview
                                <OverviewStyleToggle />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Overview data={graphRevenue} />
                        </CardContent>
                    </Card>
                </div>
            </SectionDiv>
        </MainDiv>
    )
}

export default DashboardPage
