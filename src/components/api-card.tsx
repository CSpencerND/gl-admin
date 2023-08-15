import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/copy-button"

import type { BadgeProps } from "@/components/ui/badge"

type TitleProps = {
    method?: undefined
    env: string
} | {
    method: "GET" | "POST" | "PATCH" | "DELETE"
    env?: undefined
}

type ApiCardProps = React.ComponentProps<typeof Card> & {
    content: string
    quantity?: "single" | "multi"
    accessLevel: "public" | "admin"
} & TitleProps

const accessLevelText: Record<ApiCardProps["accessLevel"], string> = {
    public: "public",
    admin: "admin",
}

const accessLevelStyle: Record<ApiCardProps["accessLevel"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive",
}

export const ApiCard: React.FC<ApiCardProps> = ({ method, env, quantity, content, accessLevel = "public" }) => {
    return (
        <Card className="font-mono">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Badge
                        base="soft"
                        variant={accessLevelStyle[accessLevel]}
                    >
                        {accessLevelText[accessLevel]}
                    </Badge>
                    <span className="text-base">{method ?? env}</span>
                    <span className="font-normal text-xs">{quantity}</span>
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
