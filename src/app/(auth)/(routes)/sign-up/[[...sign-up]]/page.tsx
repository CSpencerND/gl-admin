// "use client"

import { SignUp } from "@clerk/nextjs"

import { dark } from "@clerk/themes"
// import { useTheme } from "next-themes"

export default function SignUpPage() {
    // const { theme } = useTheme()

    // if (theme === "dark")
        return (
            <SignUp
                appearance={{
                    baseTheme: dark,
                }}
            />
        )

    // return <SignUp />
}
