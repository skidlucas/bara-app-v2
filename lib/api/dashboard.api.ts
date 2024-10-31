import baraApi from './api'

export const getDashboardNumbers = async (from: string, to: string) => {
    try {
        const { data } = await baraApi.get(`/statistics/dashboard-numbers?from=${from}&to=${to}`)
        return data
    } catch (error) {
        console.error(error)
        return { totalReceivedThisMonth: 0, totalLeftThisMonth: 0, total: 0, metricsByMonth: [] }
    }
}
