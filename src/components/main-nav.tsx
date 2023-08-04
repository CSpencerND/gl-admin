"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { useParams, usePathname } from "next/navigation"

type MainNavProps = React.ComponentProps<"menu"> & {}

export const MainNav: React.FC<MainNavProps> = ({ children, className, ...props }) => {
    const params = useParams()
    const pathname = usePathname()

    const rootHref = `/${params.storeId}`
    const settingsHref = `${rootHref}/settings`
    const billboardHref = `${rootHref}/billboard`

    const routes = [
        {
            href: rootHref,
            label: "Overview",
            active: pathname === rootHref,
        },
        {
            href: settingsHref,
            label: "Settings",
            active: pathname === settingsHref,
        },
        {
            href: billboardHref,
            label: "Billboard",
            active: pathname === billboardHref,
        },
    ]

    return (
        <menu
            className={cn("flex items-center gap-4 lg:gap-8", className)}
            {...props}
        >
            {routes.map((route, i) => (
                <li key={i}>
                    <Link
                        href={route.href}
                        className={cn(
                            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                            route.active ? "text-foreground" : ""
                        )}
                    >
                        {route.label}
                    </Link>
                </li>
            ))}
        </menu>
    )
}
