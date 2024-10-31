import baraApi from './api'
import { Patient } from '../definitions'

export const getPatients = async (page: number, limit: number, search?: string) => {
    const queryParams: any = {
        page,
        limit,
    }

    if (search) {
        queryParams.search = search
    }

    const searchParams = new URLSearchParams(queryParams)

    try {
        const { data } = await baraApi.get(`/patients?${searchParams.toString()}`)
        return { patients: data.data, totalItems: data.totalItems }
    } catch (error) {
        console.error(error)
        return { patients: [], totalItems: 0 }
    }
}

export const createPatient = async (patient: Partial<Patient>) => {
    return await baraApi.post(`/patients`, patient)
}

export const updatePatient = async (patientId: number, patient: Partial<Patient>) => {
    return await baraApi.patch(`/patients/${patientId}`, patient)
}
