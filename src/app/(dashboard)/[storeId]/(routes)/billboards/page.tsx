import { Billboard } from "@/components/billboard"
import { MainDiv } from "@/components/ui/main-div"

import type { NextPage } from "next"

type BillboardsPageProps = { params: {} }

const BillboardsPage: NextPage<BillboardsPageProps> = ({ params }) => {
    return (
        <MainDiv>
            <section>
                <Billboard />
            </section>
        </MainDiv>
    )
}

export default BillboardsPage
