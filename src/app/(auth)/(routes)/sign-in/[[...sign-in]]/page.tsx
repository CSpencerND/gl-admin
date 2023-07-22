// "use client"

import { SignIn } from "@clerk/nextjs"

import { dark } from "@clerk/themes"
// import { useTheme } from "next-themes"

export default function SignInPage() {
    // const { theme } = useTheme()

    // if (theme === "dark")
        return (
            <SignIn
                appearance={{
                    baseTheme: dark,
                }}
            />
        )

    // return <SignIn />
}
