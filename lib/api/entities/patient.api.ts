import { AxiosInstance } from 'axios'

export const getPatients = async (
    api: AxiosInstance,
    page: number,
    limit: number,
    search?: string | null,
    activeOnly = false,
) => {
    const queryParams: any = {
        page,
        limit,
    }

    if (search) {
        queryParams.search = search
    }

    if (activeOnly) {
        queryParams.activeOnly = true
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
