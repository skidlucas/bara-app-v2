import { AxiosInstance } from 'axios'

export const getPatients = async (api: AxiosInstance, page: number, limit: number, search?: string) => {
    const queryParams: any = {
        page,
        limit,
    }

    if (search) {
        queryParams.search = search
    }

    const searchParams = new URLSearchParams(queryParams)

    try {
        const { data } = await api.get(`/patients?${searchParams.toString()}`)
        return { patients: data.data, totalItems: data.totalItems }
    } catch (error) {
        console.error(error)
        return { patients: [], totalItems: 0 }
    }
}
