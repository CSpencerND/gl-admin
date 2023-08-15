"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/ui/copy-button"
// import { ServerIcon } from "lucide-react"

import type { BadgeProps } from "@/components/ui/badge"

type ApiCardProps = React.ComponentProps<typeof Card> & {
    title: string
    content: string
    accessLevel: "public" | "admin"
}

const accessLevelText: Record<ApiCardProps["accessLevel"], string> = {
    public: "public",
    admin: "admin",
}

const accessLevelStyle: Record<ApiCardProps["accessLevel"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive",
}

export const ApiCard: React.FC<ApiCardProps> = ({ title, content, accessLevel = "public" }) => {
    return (
        <Card className="font-mono">
            {/* <ServerIcon className="size-sm" /> */}
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Badge variant={accessLevelStyle[accessLevel]}>{accessLevelText[accessLevel]}</Badge>
                    <var className="not-italic text-base">{title}</var>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <code className="flex items-center justify-between rounded-sm border border-border bg-secondary py-0.5 pl-2 pr-1 text-sm">
                    {content}
                    <CopyButton content={content} />
                </code>
            </CardContent>
        </Card>
    )
}
