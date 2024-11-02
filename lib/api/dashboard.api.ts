import { get } from './api'

export const getDashboardNumbers = async (from: string, to: string) => {
    try {
        return await get(`/statistics/dashboard-numbers?from=${from}&to=${to}`)
    } catch (error) {
        console.error(error)
        return { totalReceivedThisMonth: 0, totalLeftThisMonth: 0, total: 0, metricsByMonth: [] }
    }
}
