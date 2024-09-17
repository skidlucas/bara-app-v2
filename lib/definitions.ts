export type ValueLabel = {
    value: string
    label: string
}

export type Invoice = {
    id: number
    date: Date | string
    socialSecurityAmount: number
    isSocialSecurityPaid: boolean
    insuranceAmount: number
    isInsurancePaid: boolean
    patientId: number
    patient: Patient
    insuranceId?: number
    insurance?: Insurance
}

export type Patient = {
    id: number
    firstname: string
    lastname: string
    archived: boolean
    insuranceId?: number
    insurance?: Insurance
    invoices: Invoice[]
}

export type Insurance = {
    id: number
    name: string
    amcNumber: string
}
