"use server"

import { CURRENCY } from "@/constants"
import { stripe } from "@/lib/stripe"
import { formatAmountForStripe } from "@/lib/utils"

import type { CartItem, CartProductResponse, Stripe } from "@/types"

function getTotalAmount(items: CartItem[]) {
    const totalPrice = items.reduce((total, { product, quantity }) => {
        const itemTotal = Number(product.price) * quantity

        return total + itemTotal
    }, 0)

    return totalPrice
}

export async function createPaymentIntent(items: CartItem[]) {
    const totalAmount = getTotalAmount(items)

    const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
        amount: formatAmountForStripe(totalAmount, CURRENCY),
        currency: CURRENCY,
        automatic_payment_methods: { enabled: true },
    })

    return { client_secret: paymentIntent.client_secret as string }
}

export async function updatePaymentIntent(items: CartItem[], paymentIntentId: string) {
    const totalAmount = getTotalAmount(items)

    const updated_intent = await stripe.paymentIntents.update(paymentIntentId, { amount: totalAmount })

    return updated_intent
}

export async function createStripeSession(products: CartProductResponse[], reqOrigin: string | null) {
    const session = await stripe.checkout.sessions.create({
        line_items: products.map((product) => {
            const { name, price, id, images, size, color } = product

            return {
                quantity: 1,
                price_data: {
                    currency: "usd",
                    unit_amount: price.toNumber() * 100,
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

    return session
}
