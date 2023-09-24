"use client"

import { SignUp } from "@clerk/nextjs"

// import { dark } from "@clerk/themes"
// import { useTheme } from "next-themes"

export default function SignUpPage() {
    // const { resolvedTheme } = useTheme()

    return (
        <SignUp
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
