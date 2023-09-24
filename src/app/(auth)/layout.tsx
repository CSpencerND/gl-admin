import { ThemeToggler } from "@/components/theme/theme-toggler"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className="sticky top-0 backdrop-blur-lg">
                <nav className="container flex gap-8 items-center justify-between px-8 h-[74px]">
                    <h1 aria-label="Gryffyn Labs Enterprise">GLE</h1>
                    <ThemeToggler />
                </nav>
            </header>
            <main className="grid place-items-center h-full">{children}</main>
        </>
    )
}
