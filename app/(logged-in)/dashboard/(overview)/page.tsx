import { lusitana } from '@/components/ui/fonts'
import { CardsSkeleton, RevenueChartSkeleton } from '@/components/ui/skeletons'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { format, startOfYear } from 'date-fns'

import { DashboardCardWrapper } from '@/components/ui/dashboard/dashboard-card-wrapper'
import baraServerApi from '@/lib/api/server.api'
import { RevenueChart } from '@/components/ui/dashboard/revenue-chart'
import { DateRangePicker } from '@/components/ui/basics/date-range-picker'
import { delay, formatDateYYYYMMDD } from '@/lib/utils'
import { useSession } from '@clerk/nextjs'

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
    const { isLoaded, session } = useSession()

    const getDashboardNumbers = async () => {
        const MAX_RETRIES = 2
        let attempt = 0

        while (attempt <= MAX_RETRIES) {
            try {
                if (isLoaded && session) {
                    const { data } = await baraServerApi.get(`/statistics/dashboard-numbers?from=${from}&to=${to}`)
                    return data
                } else {
                    await delay(1000)
                }
            } catch (error: any) {
                if (error?.response && error.response?.status === 401) {
                    attempt++
                    console.warn(`Attempt ${attempt} failed with 401. Retrying...`)

                    await delay(1000)

                    if (attempt > MAX_RETRIES) {
                        console.error('Max retries reached, unable to authenticate.')
                        return { totalReceivedThisMonth: 0, totalLeftThisMonth: 0, total: 1, metricsByMonth: [] }
                    }
                } else {
                    console.error(error)
                    return { totalReceivedThisMonth: 0, totalLeftThisMonth: 0, total: 2, metricsByMonth: [] }
                }
            }
        }
    }

    const numbers = await getDashboardNumbers()

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
