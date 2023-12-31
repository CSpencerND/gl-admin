"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart4Icon, LineChartIcon } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { create } from "zustand"

import { theme } from "@/constants"

import type { GraphData } from "@/types"

type UseChartStyle = {
    chartStyle: "bar" | "line"
    setChartStyle: () => void
}

const useChartStyle = create<UseChartStyle>()((set, get) => ({
    chartStyle: "bar",
    setChartStyle: () => set({ chartStyle: get().chartStyle === "bar" ? "line" : "bar" }),
}))

type OverviewProps = {
    data: GraphData[]
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
    const chartStyle = useChartStyle((s) => s.chartStyle)

    if (chartStyle === "bar") {
        return (
            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <BarChart data={data}>
                    <XAxis
                        dataKey="name"
                        stroke={theme.muted}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke={theme.muted}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Bar
                        dataKey="total"
                        fill={theme.primary}
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        )
    } else if (chartStyle === "line") {
        return (
            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <LineChart data={data}>
                    <XAxis
                        dataKey="name"
                        stroke={theme.muted}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke={theme.muted}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Line
                        dataKey="total"
                        fill={theme.primary}
                        stroke={theme.primary}
                    />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export const OverviewStyleToggle = ({ className }: { className?: string }) => {
    const chartStyle = useChartStyle((s) => s.chartStyle)
    const setChartStyle = useChartStyle((s) => s.setChartStyle)

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={setChartStyle}
                        size="icon"
                        variant="outline"
                        className={className}
                    >
                        {chartStyle === "bar" ? (
                            <BarChart4Icon className="size-sm" />
                        ) : (
                            <LineChartIcon className="size-sm" />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent
                    className="origin-[--radix-tooltip-content-transform-origin]"
                    role="tooltip"
                    align="end"
                >
                    Toggle Chart Style
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
