import { Invoice } from '../definitions'
import { del, get, patch, post } from './api'

export const getInvoices = async (page: number, limit: number, search?: string, unpaid?: string) => {
    const queryParams: any = {
        page,
        limit,
    }

    if (search) {
        queryParams.search = search
    }

    if (unpaid) {
        queryParams.unpaid = unpaid
    }
    const searchParams = new URLSearchParams(queryParams)

    try {
        const data = await get(`/invoices?${searchParams.toString()}`)
        return { invoices: data.data, totalItems: data.totalItems }
    } catch (error) {
        console.error(error)
        return { invoices: [], totalItems: 0 }
    }
}

export const createInvoice = async (invoice: Partial<Invoice>) => {
    return await post(`/invoices`, invoice)
}

export const updateInvoice = async (invoiceId: number, invoice: Partial<Invoice>) => {
    return await patch(`/invoices/${invoiceId}`, invoice)
}

export const deleteInvoice = async (invoiceId: number) => {
    await del(`/invoices/${invoiceId}`)
}

export const toggleInvoicePayment = async (
    invoiceId: number,
    body: { isSocialSecurityPaid?: boolean; isInsurancePaid?: boolean },
) => {
    await patch(`/invoices/${invoiceId}`, body)
}

export const toggleInvoicesPayment = async (invoiceIds: number[], paymentType: string) => {
    await patch(`/invoices/toggle-payment`, { invoiceIds, paymentType })
}
