import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

import type { CheckoutRequest, StoreParams } from "@/types"
import type Stripe from "stripe"

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(req: Request, { params }: StoreParams) {
    const { productIds } = (await req.json()) as CheckoutRequest

    if (!productIds || productIds.length === 0) {
        return new NextResponse("Product IDs are required", { status: 400 })
    }

    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: productIds,
            },
        },
    })

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    products.forEach((product) => {
        line_items.push({
            quantity: 1,
            price_data: {
                currency: "USD",
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price.toNumber() * 100,
            },
        })
    })

    const order = await prismadb.order.create({
        data: {
            storeId: params.storeId,
            orderItems: {
                create: productIds.map((id: string) => ({
                    product: {
                        connect: {
                            id,
                        },
                    },
                })),
            },
        },
    })

    const reqOrigin = req.headers.get("origin")

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: {
            enabled: true,
        },
        success_url: `${reqOrigin}/cart?status=success`,
        cancel_url: `${reqOrigin}/cart?status=cancelled&orderId=${order.id}`,
        metadata: {
            orderId: order.id,
        },
    })

    return NextResponse.json({ sessionId: session.id }, { headers: corsHeaders })
}

export async function PATCH(req: Request) {
    const { orderId } = (await req.json()) as { orderId: string }

    await prismadb.order.update({
        where: {
            id: orderId,
        },
        data: {
            status: "cancelled",
        },
    })

    return NextResponse.json({ orderId: orderId }, { headers: corsHeaders })
}
