'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/basics/card'
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/basics/chart'

interface RevenueChartProps {
    metrics: MetricsByMonth[]
}

interface MetricsByMonth {
    month: string
    paid: number
    unpaid: number
}

const chartConfig = {
    paid: {
        label: 'Reçu',
        color: 'hsl(var(--chart-green))',
    },
    unpaid: {
        label: 'Restant',
        color: 'hsl(var(--chart-red))',
    },
} satisfies ChartConfig

export function RevenueChart({ metrics }: RevenueChartProps) {
    return (
        <Card className="mt-6 md:max-w-[1400px]">
            <CardHeader>
                <CardTitle>Répartition en € par mois</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={metrics}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="paid" stackId="a" fill="var(--color-paid)" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="unpaid" stackId="a" fill="var(--color-unpaid)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
