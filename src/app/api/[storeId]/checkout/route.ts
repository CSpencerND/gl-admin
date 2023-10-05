import { CURRENCY, corsHeaders } from "@/constants"
import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"
import { formatAmountForStripe } from "@/lib/utils"
import { NextResponse } from "next/server"

import type { CheckoutRequest, StoreParams } from "@/types"

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET(req: Request, { params }: StoreParams) {
    console.log(params)
    return NextResponse.json({ thing: "Hello from the checkout route!" }, { headers: corsHeaders })
}

export async function POST(req: Request, { params }: StoreParams) {
    const { cartItems, paymentIntentId } = (await req.json()) as CheckoutRequest
    const productIds = cartItems.map((item) => item.product.id)
    const reqOrigin = req.headers.get("origin")

    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: productIds,
            },
        },
        include: {
            images: true,
            size: true,
            color: true,
            category: true,
        },
    })

    const session = await stripe.checkout.sessions.create({
        line_items: products.map((products, i) => {
            const { name, price, id, images, size, color } = products

            return {
                quantity: cartItems[i].quantity,
                price_data: {
                    currency: CURRENCY,
                    unit_amount: formatAmountForStripe(price.toNumber(), CURRENCY),
                    product_data: {
                        name,
                        description: `${color.name} | ${size.name}`,
                        images: images.map((image) => image.url),
                        metadata: {
                            id,
                        },
                    },
                },
            }
        }),
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: {
            enabled: true,
        },
        success_url: `${reqOrigin}/cart?status=success`,
        cancel_url: `${reqOrigin}/cart?status=cancelled`,
    })
}

// export async function PATCH(req: Request) {
//     const { orderId } = (await req.json()) as { orderId: string }
//
//     await prismadb.order.update({
//         where: {
//             id: orderId,
//         },
//         data: {
//             status: "cancelled",
//         },
//     })
//
//     return NextResponse.json({ orderId: orderId }, { headers: corsHeaders })
// }

// async function createOrder(storeId: string, paymentId: string, productIds: string[]) {
//     const order = await prismadb.order.create({
//         data: {
//             storeId,
//             paymentId,
//             orderItems: {
//                 create: productIds.map((id: string) => ({
//                     product: {
//                         connect: {
//                             id,
//                         },
//                     },
//                 })),
//             },
//         },
//     })
//
//     return order
// }

// async function updateOrder(paymentId: string, productIds: string[], orderStatus: string, orderId?: string) {
//     if (!orderId) throw new Error("No Order ID")
//
//     const order = await prismadb.order.update({
//         where: {
//             id: orderId,
//         },
//         data: {
//             status: orderStatus as OrderStatus,
//             paymentId,
//             orderItems: {
//                 deleteMany: {},
//             },
//         },
//     })
//
//     await prismadb.order.update({
//         where: {
//             id: orderId,
//         },
//         data: {
//             orderItems: {
//                 create: productIds.map((id: string) => ({
//                     product: {
//                         connect: {
//                             id,
//                         },
//                     },
//                 })),
//             },
//         },
//     })
//
//     return order
// }

// async function getOrderId(paymentId: string) {
//     const order = await prismadb.order.findFirst({
//         where: {
//             paymentId,
//         },
//     })
//
//     return order?.id
// }

// const { productIds } = (await req.json()) as CheckoutRequest

// if (!productIds || productIds.length === 0) {
//     return new NextResponse("Product IDs are required", { status: 400 })
// }
//
// const products = await prismadb.product.findMany({
//     where: {
//         id: {
//             in: productIds,
//         },
//     },
//     include: {
//         images: true,
//         size: true,
//         color: true,
//         category: true,
//     },
// })

// console.log(products)

// const reqOrigin = req.headers.get("origin")

// const session = await createStripeSession(products, reqOrigin)

// return NextResponse.json({ payment_intent_id: client_secret }, { headers: corsHeaders })
// return NextResponse.json({ session: session }, { headers: corsHeaders })

// export async function POST(req: Request, { params }: StoreParams) {
//     const { cartItems, paymentIntentId } = (await req.json()) as CheckoutRequest
//     const productIds = cartItems.map((item) => item.product.id)
//
//     if (!paymentIntentId) {
//         const { client_secret } = await createPaymentIntent(cartItems)
//         await createOrder(params.storeId, client_secret, productIds)
//
//         return NextResponse.json({ payment_intent_id: client_secret }, { headers: corsHeaders })
//     } else {
//         const updatedIntent = await updatePaymentIntent(cartItems, paymentIntentId)
//         updatedIntent.status
//
//         const orderStatus = {
//             requires_payment_method: "pending",
//             requires_confirmation: "pending",
//             requires_action: "pending",
//             requires_capture: "pending",
//             processing: "pending",
//             canceled: "cancelled",
//             succeeded: "paid",
//         }
//
//         const newStatus = orderStatus[updatedIntent.status]
//
//         const orderId = await getOrderId(paymentIntentId)
//         await updateOrder(paymentIntentId, productIds, newStatus, orderId)
//
//         return NextResponse.json({ payment_intent_id: updatedIntent }, { headers: corsHeaders })
//     }
// }
