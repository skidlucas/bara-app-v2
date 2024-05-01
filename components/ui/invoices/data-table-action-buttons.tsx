'use client'

import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/basics/button'
import { Invoice } from '@/lib/definitions'

interface DataTableActionButtonsProps<TData> {
    table: Table<TData>
}

export function DataTableActionButtons<TData>({ table }: DataTableActionButtonsProps<TData>) {
    const selectedRows = table.getFilteredSelectedRowModel().rows

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

    const toggleSocialSecurityPayment = () => {
        console.log(selectedRows)
    }

    const toggleInsurancePayment = () => {
        console.log(selectedRows)
    }

    return (
        <div className="hidden ml-auto md:inline-flex md:space-x-2">
            {(allPaidForSocialSecurity || nonePaidForSocialSecurity) && (
                <Button variant="outline" size="sm" className="h-8 lg:flex" onClick={toggleSocialSecurityPayment}>
                    Marquer CPAM comme {allPaidForSocialSecurity ? 'impayé' : 'payé'}
                </Button>
            )}

            {(allPaidForInsurance || nonePaidForInsurance) && (
                <Button variant="outline" size="sm" className="h-8 lg:flex" onClick={toggleInsurancePayment}>
                    Marquer mutuelle comme {allPaidForInsurance ? 'impayé' : 'payé'}
                </Button>
            )}
        </div>
    )
}
