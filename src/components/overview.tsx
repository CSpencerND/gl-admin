"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart4Icon, LineChartIcon } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { useHydrated } from "@/lib/hooks"
import { create } from "zustand"

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

    const hydrated = useHydrated()
    if (!hydrated) return null

    if (chartStyle === "bar") {
        return (
            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <BarChart data={data}>
                    <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Bar
                        dataKey="total"
                        fill="#00d8db"
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
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Line
                        dataKey="total"
                        fill="#00d8db"
                    />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export const OverviewStyleToggle = () => {
    const chartStyle = useChartStyle((s) => s.chartStyle)
    const setChartStyle = useChartStyle((s) => s.setChartStyle)

    const hydrated = useHydrated()
    if (!hydrated) return null

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        onClick={setChartStyle}
                        size="icon"
                        variant="outline"
                    >
                        {chartStyle === "bar" ? (
                            <BarChart4Icon className="size-sm" />
                        ) : (
                            <LineChartIcon className="size-sm" />
                        )}
                    </Button>
                    <TooltipContent
                        className="origin-[--radix-tooltip-content-transform-origin]"
                        role="tooltip"
                        align="end"
                    >
                        Toggle Chart Style
                    </TooltipContent>
                </TooltipTrigger>
            </Tooltip>
        </TooltipProvider>
    )
}
