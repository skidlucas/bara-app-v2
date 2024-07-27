import { lusitana } from '@/components/ui/fonts'
import { CardsSkeleton, RevenueChartSkeleton } from '@/components/ui/skeletons'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { DashboardCardWrapper } from '@/components/ui/dashboard/dashboard-card-wrapper'
import baraServerApi from '@/lib/api/server.api'
import { RevenueChart } from '@/components/ui/dashboard/revenue-chart'

export const metadata: Metadata = {
    title: 'Dashboard',
}
export default async function Page() {
    const getDashboardNumbers = async () => {
        try {
            const { data } = await baraServerApi.get(`/statistics/dashboard-numbers`)
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
            <Suspense fallback={<CardsSkeleton />}>
                <DashboardCardWrapper numbers={numbers} />
            </Suspense>
            {/*todo add datepicker */}
            <Suspense fallback={<RevenueChartSkeleton />}>{<RevenueChart />}</Suspense>
        </main>
    )
}
