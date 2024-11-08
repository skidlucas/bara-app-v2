import { InsuranceFormValues } from '@/components/ui/insurances/insurance-form'
import { get, post } from './api'

export const getInsurances = async (page: number, limit: number, search?: string) => {
    const queryParams: any = {
        page,
        limit,
    }

    if (search) {
        queryParams.search = search
    }

    const searchParams = new URLSearchParams(queryParams)

    try {
        const data = await get(`/insurances?${searchParams.toString()}`)
        return { insurances: data.data, totalItems: data.totalItems }
    } catch (error) {
        console.error(error)
        return { insurances: [], totalItems: 0 }
    }
}

export const createInsurance = async (insurance: InsuranceFormValues) => {
    return await post(`/insurances`, insurance)
}
