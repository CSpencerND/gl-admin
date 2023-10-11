// import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    // await clean()

    // const res = await prisma.product.findMany({
    //     include: {
    //         images: true,
    //     },
    // })
    // console.log(res)

    // const res = await prisma.order.deleteMany({
    //     where: {
    //         status: "pending"
    //     }
    // })

    const res = await prisma.user.findMany({
        include: {
            stores: true
        }
    })

    console.log(JSON.stringify(res, null, 3))
}

main()
    .catch((e) => {
        console.error(e.message)
    })
    .finally(() => {
        prisma.$disconnect
    })

async function clean() {
    await prisma.billboard.deleteMany()
    await prisma.imageData.deleteMany()
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
}
