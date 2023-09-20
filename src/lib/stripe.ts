import Stripe from "stripe"

const key = process.env.STRIPE_API_KEY ?? ""

export const stripe = new Stripe(key, {
    apiVersion: "2023-08-16",
    typescript: true,
})

// const appearance = {
//   theme: 'night',
//   labels: 'floating'
// };
//
// const elements = stripe.elements({clientSecret, appearance});
