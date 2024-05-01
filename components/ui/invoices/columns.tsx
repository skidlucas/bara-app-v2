'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Invoice } from '@/lib/definitions'
import { formatCurrency, formatDateDDMMYYYY } from '@/lib/utils'
import { Button } from '@/components/ui/basics/button'
import { Checkbox } from '@/components/ui/basics/checkbox'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Badge } from '@/components/ui/basics/badge'
import { ResponsiveDialog } from '@/components/ui/basics/responsive-dialog'
import { InvoiceForm } from '@/components/ui/invoices/invoice-form'

export const columns: ColumnDef<Invoice>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                className="hidden md:block"
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Tout sélectionner"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="hidden md:block"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Sélectionner la facture"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'patient',
        header: 'Patient',
        cell: ({ row }) => {
            return `${row.original.patient.firstname} ${row.original.patient.lastname}`
        },
    },
    {
        accessorKey: 'socialSecurity',
        header: 'CPAM',
        cell: ({ row }) => {
            const amount = formatCurrency(row.original.socialSecurityAmount)

            return (
                <Badge
                    variant={row.original.isSocialSecurityPaid ? 'creative' : 'destructive'}
                    className="hover:cursor-pointer"
                    onClick={() => console.log('marquer comme payé/impayé')}
                >
                    {amount}
                </Badge>
            )
        },
    },
    {
        accessorKey: 'insurance',
        header: 'Mutuelle',
        cell: ({ row }) => {
            const amount = formatCurrency(row.original.insuranceAmount)

            if (row.original.insurance?.name && amount) {
                return (
                    <div>
                        {row.original.insurance.name} :
                        <Badge
                            variant={row.original.isInsurancePaid ? 'creative' : 'destructive'}
                            className="hover:cursor-pointer md:ml-1"
                            onClick={() => console.log('marquer comme payé/impayé')}
                        >
                            {amount}
                        </Badge>
                    </div>
                )
            }
            return 'Pas de paiement'
        },
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => {
            return formatCurrency(row.original.socialSecurityAmount + row.original.insuranceAmount)
        },
    },
    {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => {
            return formatDateDDMMYYYY(row.original.date)
        },
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => {
            const invoice = row.original

            return (
                <div className="space-y-1 md:space-y-0 md:space-x-2">
                    <ResponsiveDialog
                        openButton={
                            <Button
                                variant="outline"
                                className="p-2"
                                onClick={() => console.log(`modifier ${invoice.id}`)}
                            >
                                <span className="sr-only">Modifier la facture</span>
                                <PencilIcon className="w-5" />
                            </Button>
                        }
                        title="Modifier la facture"
                    >
                        <InvoiceForm invoice={invoice} />
                    </ResponsiveDialog>

                    <Button variant="outline" className="p-2" onClick={() => console.log(`supprimer ${invoice.id}`)}>
                        <span className="sr-only">Supprimer la facture</span>
                        <TrashIcon className="w-5" />
                    </Button>
                </div>
            )
        },
    },
]
