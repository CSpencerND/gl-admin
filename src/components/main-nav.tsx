"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { useParams, usePathname } from "next/navigation"

import type { StoreParams } from "@/types"

type MainNavProps = React.ComponentProps<"menu"> & {}

export const MainNav: React.FC<MainNavProps> = ({ children, className, ...props }) => {
    const { storeId } = useParams() as StoreParams["params"]
    const pathname = usePathname()

    const rootHref = `/${storeId}`
    const settingsHref = `${rootHref}/settings`
    const billboardHref = `${rootHref}/billboards`
    const categoriesHref = `${rootHref}/categories`

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
            label: "Billboards",
            active: pathname === billboardHref,
        },
        {
            href: categoriesHref,
            label: "Categories",
            active: pathname === categoriesHref,
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
