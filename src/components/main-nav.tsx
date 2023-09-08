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
    const bannerHref = `${rootHref}/banners`
    const categoriesHref = `${rootHref}/categories`
    const sizesHref = `${rootHref}/sizes`
    const colorsHref = `${rootHref}/colors`
    const productsHref = `${rootHref}/products`
    const ordersHref = `${rootHref}/orders`

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
            href: bannerHref,
            label: "Banners",
            active: pathname === bannerHref,
        },
        {
            href: categoriesHref,
            label: "Categories",
            active: pathname === categoriesHref,
        },
        {
            href: productsHref,
            label: "Products",
            active: pathname === productsHref,
        },
        {
            href: sizesHref,
            label: "Sizes",
            active: pathname === sizesHref,
        },
        {
            href: colorsHref,
            label: "Colors",
            active: pathname === colorsHref,
        },
        {
            href: ordersHref,
            label: "Orders",
            active: pathname === ordersHref,
        },
    ]

    return (
        <menu
            className={cn("flex items-center", className)}
            {...props}
        >
            {routes.map((route, i) => (
                <li
                    key={i}
                    className={cn("hover:scale-110 transition-transform", route.active ? "scale-110" : "")}
                >
                    <Link
                        href={route.href}
                        className={cn(
                            "p-4 text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
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
