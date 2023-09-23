import Stripe from "stripe"

const key = process.env.STRIPE_API_KEY!

export const stripe = new Stripe(key, {
    apiVersion: "2023-08-16",
    typescript: true,
    // appInfo: {
    //     name: "nextjs-with-stripe-typescript-demo",
    //     url: "https://nextjs-with-stripe-typescript-demo.vercel.app",
    // },
})
