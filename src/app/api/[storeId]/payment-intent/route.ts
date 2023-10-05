import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

import { CURRENCY, corsHeaders } from "@/constants"
import { formatAmountForStripe } from "@/lib/utils"

import type { CheckoutRequest } from "@/types"
import type Stripe from "stripe"

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET() {
    return NextResponse.json({ thing: "Hello from the payment-intent GET route!" }, { headers: corsHeaders })
}

export async function POST(req: Request) {
    try {
        const { cartItems } = (await req.json()) as CheckoutRequest

        if (!cartItems) {
            return new NextResponse("You must provide cart items", { status: 400, headers: corsHeaders })
        }

        const cartAmount = cartItems.reduce((total, { product, quantity }) => {
            return total + Number(product.price) * quantity
        }, 0)

        const formattedCartAmount = formatAmountForStripe(cartAmount, CURRENCY)

        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
            amount: formattedCartAmount,
            currency: CURRENCY,
            automatic_payment_methods: { enabled: true },
        })

        const data = { newPaymentIntentId: paymentIntent.id, newClientSecret: paymentIntent.client_secret }

        return NextResponse.json(data, { headers: corsHeaders })
    } catch (error) {
        console.log("[PAYMENT_INTENT_POST]", error)
        return new NextResponse("Internal Error", { status: 500, headers: corsHeaders })
    }
}

export async function PATCH(req: Request) {
    try {
        const { cartItems, paymentIntentId } = (await req.json()) as CheckoutRequest

        if (!cartItems) {
            return new NextResponse("You must provide cart items", { status: 400, headers: corsHeaders })
        }

        if (!paymentIntentId) {
            return new NextResponse("You must provide a payment intent id", { status: 400, headers: corsHeaders })
        }

        const cartAmount = cartItems.reduce((total, { product, quantity }) => {
            return total + Number(product.price) * quantity
        }, 0)

        const formattedCartAmount = formatAmountForStripe(cartAmount, CURRENCY)
        const currentPaymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

        if (formattedCartAmount === currentPaymentIntent.amount) {
            return new NextResponse("Amount is the same", { headers: corsHeaders })
        } else {
            await stripe.paymentIntents.update(paymentIntentId, {
                amount: formattedCartAmount,
            })

            return new NextResponse("Payment Intent has been updated", { headers: corsHeaders })
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log("[PAYMENT_INTENT_PUT]", error.message)
        }
        return new NextResponse("Internal Error", { status: 500, headers: corsHeaders })
    }
}
