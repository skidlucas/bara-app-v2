'use client'

import { DashboardCard } from '@/components/ui/dashboard/dashboard-card'

interface DashboardCardWrapperProps {
    numbers: { totalReceivedThisMonth: number; totalLeftThisMonth: number; total: number }
}
export function DashboardCardWrapper({ numbers }: DashboardCardWrapperProps) {
    const { totalReceivedThisMonth, totalLeftThisMonth, total } = numbers

    return (
        <div className="md:flex md:justify-between">
            <DashboardCard title={`${totalReceivedThisMonth.toFixed(2)} €`} description="Total reçu (mois courant)" />
            <DashboardCard title={`${totalLeftThisMonth.toFixed(2)} €`} description="Total restant (mois courant)" />
            <DashboardCard title={`${total.toFixed(2)} €`} description="Total reçu" />
        </div>
    )
}
