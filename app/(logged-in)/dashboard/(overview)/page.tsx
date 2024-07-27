import { lusitana } from '@/components/ui/fonts'
import { CardsSkeleton, RevenueChartSkeleton } from '@/components/ui/skeletons'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { startOfYear } from 'date-fns'

import { DashboardCardWrapper } from '@/components/ui/dashboard/dashboard-card-wrapper'
import baraServerApi from '@/lib/api/server.api'
import { RevenueChart } from '@/components/ui/dashboard/revenue-chart'
import { DateRangePicker } from '@/components/ui/basics/date-range-picker'
import { formatDateYYYYMMDD } from '@/lib/utils'

export const metadata: Metadata = {
    title: 'Dashboard',
}
export default async function Page({
    searchParams,
}: {
    searchParams?: {
        from?: string
        to?: string
    }
}) {
    const today = new Date()
    const from = searchParams?.from ?? formatDateYYYYMMDD(startOfYear(today))
    const to = searchParams?.to ?? formatDateYYYYMMDD(today)

    const getDashboardNumbers = async () => {
        try {
            const { data } = await baraServerApi.get(`/statistics/dashboard-numbers?from=${from}&to=${to}`)
            return data
        } catch (error) {
            console.error(error)
            return { totalReceivedThisMonth: 0, totalLeftThisMonth: 0, total: 0 }
        }
    }

    const numbers = await getDashboardNumbers()

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <DateRangePicker className="mt-4 md:mt-8 mb-4" from={new Date(from)} to={new Date(to)} />
            <Suspense fallback={<CardsSkeleton />}>
                <DashboardCardWrapper numbers={numbers} />
            </Suspense>
            <Suspense fallback={<RevenueChartSkeleton />}>{<RevenueChart />}</Suspense>
        </main>
    )
}
