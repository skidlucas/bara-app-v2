import { AxiosInstance } from 'axios'

export const getInsurances = async (api: AxiosInstance, page: number, limit: number, search?: string) => {
    const queryParams: any = {
        page,
        limit,
    }

    if (search) {
        queryParams.search = search
    }

    const searchParams = new URLSearchParams(queryParams)

    try {
        const { data } = await api.get(`/insurances?${searchParams.toString()}`)
        return { insurances: data.data, totalItems: data.totalItems }
    } catch (error) {
        console.error(error)
        return { insurances: [], totalItems: 0 }
    }
}
