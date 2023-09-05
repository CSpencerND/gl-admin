import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function clean() {
    await prisma.billboard.deleteMany()
    await prisma.imageData.deleteMany()
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
}

async function main() {
    // await clean()

    const res = await prisma.billboard.findMany()

    console.log(res)
}

main()
    .catch((e) => {
        console.error(e.message)
    })
    .finally(() => {
        prisma.$disconnect
    })
