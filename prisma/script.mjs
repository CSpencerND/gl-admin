import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function clean() {
    await prisma.billboard.deleteMany()
    await prisma.imageSource.deleteMany()
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
}

async function main() {
    await clean()

    // const bb = await prisma.billboard.create({
    //     data: {
    //         label: faker.person.jobTitle(),
    //         storeId: faker.database.mongodbObjectId(),
    //         image: {
    //             create: {
    //                 key: faker.database.mongodbObjectId(),
    //                 name: faker.person.firstName(),
    //                 size: faker.number.int({ max: 100 }),
    //                 url: faker.lorem.slug(),
    //             },
    //         },
    //     },
    //     include: {
    //         image: {
    //             select: {
    //                 name: true,
    //                 key: true,
    //                 url: true,
    //                 size: true
    //             }
    //         }
    //     }
    // })

    // const src = await prisma.imageSource.create({
    //     data: {
    //         key: faker.database.mongodbObjectId(),
    //         name: faker.person.firstName(),
    //         size: faker.number.int({ max: 100 }),
    //         url: faker.lorem.slug(),
    //         billboardId: bb.id,
    //     },
    // })

    // const res = await prisma.billboard.findUnique({
    //     where: {
    //         id: bb.id,
    //     },
    //     include: {
    //         image: {
    //             select: {
    //                 name: true,
    //                 key: true,
    //                 url: true,
    //                 size: true,
    //             },
    //         },
    //     },
    // })

    console.log(res)
}

main()
    .catch((e) => {
        console.error(e.message)
    })
    .finally(() => {
        prisma.$disconnect
    })
