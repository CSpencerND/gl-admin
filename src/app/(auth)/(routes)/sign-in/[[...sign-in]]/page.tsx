"use client"

import { SignIn } from "@clerk/nextjs"

// import { dark } from "@clerk/themes"
// import { useTheme } from "next-themes"

export default function SignInPage() {
    // const { resolvedTheme } = useTheme()

    return (
        <SignIn
            // appearance={{
            //     baseTheme: resolvedTheme === "dark" ? dark : undefined,
            //     variables: {
            //         colorPrimary: "rgb(13 148 136)",
            //         // colorDanger: "",
            //         // colorSuccess: "",
            //         // colorWarning: "",
            //         // colorTextOnPrimaryBackground: "",
            //         // colorTextSecondary: "",
            //         // colorBackground: "",
            //         // colorInputText: "",
            //         // colorInputBackground: "",
            //     },
            // }}
        />
    )
}
