import { CopyButton } from "@/components/copy-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { BadgeProps } from "@/components/ui/badge"

type Env = {
    method?: null
    env: string
}

type Method = {
    method: "GET" | "POST" | "PATCH" | "DELETE"
    env?: null
}

type TitleProps = Env | Method

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
            <CardContent className="relative">
                <code className="flex items-center justify-between rounded-md border border-border h-14 px-4 text-sm whitespace-nowrap overflow-scroll">
                    {content}
                    <CopyButton
                        content={env ? `${env}=${content}` : content}
                        contentName="API Route"
                        className="absolute right-2"
                    />
                </code>
            </CardContent>
        </Card>
    )
}
