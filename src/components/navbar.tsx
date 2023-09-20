import { MainNav } from "@/components/main-nav"
import { StoreSwitcher } from "@/components/store-switcher"
import { ThemeToggler } from "./theme/theme-toggler"

import prismadb from "@/lib/prismadb"
import { UserButton, auth } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

import { redirect } from "next/navigation"

type NavbarProps = {}

export const Navbar: React.FC<NavbarProps> = async () => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    })

    return (
        <header className="border-b sticky top-0 backdrop-blur-lg">
            <div className="container flex gap-8 items-center px-8 h-[74px]">
                <nav className="flex items-center gap-8">
                    <h1 aria-label="Gryffyn Labs Enterprise">GLE</h1>
                    <StoreSwitcher items={stores} />
                    <MainNav />
                </nav>
                <div className="ml-auto flex items-center gap-8">
                    <ThemeToggler />
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{ baseTheme: dark }}
                    />
                </div>
            </div>
        </header>
    )
}
