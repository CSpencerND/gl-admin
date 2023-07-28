"use client"

import { ThemeToggler } from "@/components/theme/theme-toggler"

export function TailwindIndicator() {
    if (process.env.NODE_ENV === "production") return null

    return (
        <>
            <div className="fixed bottom-1 left-1 z-[99] flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800 font-medium text-xs text-white">
                <div className="block sm:hidden">xs</div>
                <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">sm</div>
                <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
                <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
                <div className="hidden xl:block 2xl:hidden">xl</div>
                <div className="hidden 2xl:block">2xl</div>
            </div>

            <div className="fixed bottom-1 right-1 z-50 h-7 w-7 [&>*]:h-7 [&>*]:w-7">
                <ThemeToggler />
            </div>
        </>
    )
}
