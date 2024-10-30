import { lusitana } from '@/components/ui/fonts'
import { CardsSkeleton, RevenueChartSkeleton } from '@/components/ui/skeletons'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { format, startOfYear } from 'date-fns'

import { DashboardCardWrapper } from '@/components/ui/dashboard/dashboard-card-wrapper'
import baraServerApi from '@/lib/api/server.api'
import { RevenueChart } from '@/components/ui/dashboard/revenue-chart'
import { DateRangePicker } from '@/components/ui/basics/date-range-picker'
import { formatDateYYYYMMDD, delay } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'

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
    const user = await currentUser()

    const getDashboardNumbers = async () => {
        let attempts = 0
        const maxAttempts = 3
        while (attempts < maxAttempts) {
            try {
                if (!user) {
                    await delay(1000)
                    continue
                }

                const { data } = await baraServerApi.get(`/statistics/dashboard-numbers?from=${from}&to=${to}`)
                return data
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    console.error('401 - Error fetching statistics - data', error.response.data)
                    console.error('401 - Error fetching statistics - headers', error.response.headers)

                    attempts++
                    if (attempts < maxAttempts) {
                        await delay(2000)
                    } else {
                        console.error('Max attempts reached. Could not fetch dashboard numbers.')
                        return { totalReceivedThisMonth: 0, totalLeftThisMonth: 0, total: 0, metricsByMonth: [] }
                    }
                } else {
                    console.error(error)
                    return { totalReceivedThisMonth: 0, totalLeftThisMonth: 0, total: 0, metricsByMonth: [] }
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
