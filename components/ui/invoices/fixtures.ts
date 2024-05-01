import { Invoice } from '@/lib/definitions'

export const fakeInvoices: Invoice[] = [
    {
        id: 1,
        date: new Date(),
        socialSecurityAmount: 2000,
        isSocialSecurityPaid: true,
        insuranceAmount: 250,
        isInsurancePaid: false,
        patientId: 1,
        patient: {
            id: 1,
            firstname: 'Georges',
            lastname: 'Delajungle',
        },
        insuranceId: 1,
        insurance: {
            id: 1,
            name: 'Alan',
        },
    },
    {
        id: 2,
        date: new Date(),
        socialSecurityAmount: 1500,
        isSocialSecurityPaid: true,
        insuranceAmount: 0,
        isInsurancePaid: false,
        patientId: 2,
        patient: {
            id: 2,
            firstname: 'Jane',
            lastname: 'Doe',
        },
    },
    {
        id: 3,
        date: new Date(),
        socialSecurityAmount: 1800,
        isSocialSecurityPaid: false,
        insuranceAmount: 300,
        isInsurancePaid: false,
        patientId: 3,
        patient: {
            id: 3,
            firstname: 'John',
            lastname: 'Smith',
        },
        insuranceId: 3,
        insurance: {
            id: 3,
            name: 'John Hancock',
        },
    },
    {
        id: 4,
        date: new Date(),
        socialSecurityAmount: 2200,
        isSocialSecurityPaid: true,
        insuranceAmount: 180,
        isInsurancePaid: true,
        patientId: 4,
        patient: {
            id: 4,
            firstname: 'Alice',
            lastname: 'Wonderland',
        },
        insuranceId: 4,
        insurance: {
            id: 4,
            name: 'Wonder Insurances',
        },
    },
    {
        id: 5,
        date: new Date(),
        socialSecurityAmount: 1900,
        isSocialSecurityPaid: true,
        insuranceAmount: 220,
        isInsurancePaid: false,
        patientId: 5,
        patient: {
            id: 5,
            firstname: 'Bob',
            lastname: 'Builder',
        },
        insuranceId: 5,
        insurance: {
            id: 5,
            name: 'Builder Insurance',
        },
    },
]
