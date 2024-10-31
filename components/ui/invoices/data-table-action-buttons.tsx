'use client'

import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/basics/button'
import { Invoice } from '@/lib/definitions'
import { useRouter } from 'next/navigation'
import { toggleInvoicesPayment } from '@/lib/api/invoice.api'

interface DataTableActionButtonsProps<TData> {
    table: Table<TData>
}

export function DataTableActionButtons<TData>({ table }: DataTableActionButtonsProps<TData>) {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const { refresh } = useRouter()

    if (!selectedRows.length) return null

    const allPaidForSocialSecurity = selectedRows.every((row) => {
        const invoice = row.original as Invoice
        return !!invoice.socialSecurityAmount && invoice.isSocialSecurityPaid
    })

    const nonePaidForSocialSecurity = selectedRows.every((row) => {
        const invoice = row.original as Invoice
        return !!invoice.socialSecurityAmount && !invoice.isSocialSecurityPaid
    })

    const allPaidForInsurance = selectedRows.every((row) => {
        const invoice = row.original as Invoice
        return !!invoice.insuranceAmount && invoice.isInsurancePaid
    })

    const nonePaidForInsurance = selectedRows.every((row) => {
        const invoice = row.original as Invoice
        return !!invoice.insuranceAmount && !invoice.isInsurancePaid
    })

    const togglePayment = async (paymentType: string) => {
        const invoiceIds: number[] = []
        for (const row of selectedRows) {
            const invoice = row.original as Invoice
            invoiceIds.push(invoice.id)
        }

        try {
            await toggleInvoicesPayment(invoiceIds, paymentType)
        } catch (err) {
            console.log(err)
        } finally {
            refresh()
        }
    }

    return (
        <div className="hidden ml-auto md:inline-flex md:space-x-2">
            {(allPaidForSocialSecurity || nonePaidForSocialSecurity) && (
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 lg:flex"
                    onClick={() => togglePayment('socialSecurity')}
                >
                    Marquer CPAM comme {allPaidForSocialSecurity ? 'impayé' : 'payé'}
                </Button>
            )}

            {(allPaidForInsurance || nonePaidForInsurance) && (
                <Button variant="outline" size="sm" className="h-8 lg:flex" onClick={() => togglePayment('insurance')}>
                    Marquer mutuelle comme {allPaidForInsurance ? 'impayé' : 'payé'}
                </Button>
            )}
        </div>
    )
}
