import { lusitana } from '@/components/ui/fonts'
import { CardsSkeleton, RevenueChartSkeleton } from '@/components/ui/skeletons'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { format, startOfYear } from 'date-fns'

import { DashboardCardWrapper } from '@/components/ui/dashboard/dashboard-card-wrapper'
import { RevenueChart } from '@/components/ui/dashboard/revenue-chart'
import { DateRangePicker } from '@/components/ui/basics/date-range-picker'
import { formatDateYYYYMMDD } from '@/lib/utils'
import { getDashboardNumbers } from '@/lib/api/dashboard.api'

export const metadata: Metadata = {
    title: 'Dashboard',
}
export default async function Page(props: {
    searchParams?: Promise<{
        from?: string
        to?: string
    }>
}) {
    const searchParams = await props.searchParams
    const today = new Date()
    const from = searchParams?.from ?? formatDateYYYYMMDD(startOfYear(today))
    const to = searchParams?.to ?? formatDateYYYYMMDD(today)

    const numbers = await getDashboardNumbers(from, to)

    const metrics = []
    for (const metric of numbers.metricsByMonth) {
        const paid = metric.total_social_security_paid + metric.total_insurance_paid
        const unpaid = metric.total_social_security_unpaid + metric.total_insurance_unpaid
        metrics.push({
            month: format(new Date(metric.month), 'LLLL yyyy'),
            paid,
            unpaid,
        })
    }

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <DateRangePicker className="mt-4 md:mt-8 mb-4" from={new Date(from)} to={new Date(to)} />
            <Suspense fallback={<CardsSkeleton />}>
                <DashboardCardWrapper numbers={numbers} />
            </Suspense>
            <Suspense fallback={<RevenueChartSkeleton />}>{<RevenueChart metrics={metrics} />}</Suspense>
        </main>
    )
}
