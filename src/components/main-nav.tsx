"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { useParams, usePathname } from "next/navigation"

type MainNavProps = React.ComponentProps<"menu"> & {

}

export const MainNav: React.FC<MainNavProps> = ({ children, className, ...props }) => {
    const params = useParams()
    const pathname = usePathname()
    const href = `/${params.storeId}/settings`

    const routes = [{
        href,
        lable: "Settings",
        active: pathname === href
    }]

    return (
        <menu className={cn("flex items-center gap-4 lg:gap-8", className)} {...props}>
            {routes.map((route, i) => (
                <li key={i}>
                    <Link
                        href={route.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            route.active ? "text-black dark:text-white" : ""
                        )}
                    >
                        {route.lable}
                    </Link>
                </li>
            ))}
        </menu>
    )
}
