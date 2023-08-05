// "use client"

import { SignUp } from "@clerk/nextjs"

import { dark } from "@clerk/themes"
// import { useTheme } from "next-themes"

import type { NextPage } from "next"

const SignUpPage: NextPage = () => {
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

export default SignUpPage
