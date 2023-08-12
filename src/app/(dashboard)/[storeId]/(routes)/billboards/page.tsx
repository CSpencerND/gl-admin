import { Billboard } from "@/components/billboard"
import { MainDiv, SectionDiv } from "@/components/ui/divs"

import type { NextPage } from "next"

type BillboardsPageProps = { params: {} }

const BillboardsPage: NextPage<BillboardsPageProps> = ({ params }) => {
    return (
        <MainDiv>
            <SectionDiv>
                <Billboard />
            </SectionDiv>
        </MainDiv>
    )
}

export default BillboardsPage
