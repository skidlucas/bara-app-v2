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
import { useState } from 'react'
import baraClientApi from '@/lib/api/client.api'
import { useRouter } from 'next/navigation'

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
        cell: function CellComponent({ row }) {
            const invoice = row.original
            const [isPaid, setIsPaid] = useState(row.original.isSocialSecurityPaid)

            const toggleSocialSecurityPayment = async () => {
                try {
                    await baraClientApi.patch(`/invoices/${invoice.id}`, { isSocialSecurityPaid: !isPaid })
                    setIsPaid(!isPaid)
                } catch (err) {
                    console.log(err)
                }
            }

            const amount = formatCurrency(invoice.socialSecurityAmount)

            return (
                <Badge
                    variant={isPaid ? 'creative' : 'destructive'}
                    className="hover:cursor-pointer"
                    onClick={toggleSocialSecurityPayment}
                >
                    {amount}
                </Badge>
            )
        },
    },
    {
        accessorKey: 'insurance',
        header: 'Mutuelle',
        cell: function CellComponent({ row }) {
            const invoice = row.original
            const [isPaid, setIsPaid] = useState(row.original.isInsurancePaid)

            const toggleInsurancePayment = async () => {
                try {
                    await baraClientApi.patch(`/invoices/${invoice.id}`, { isInsurancePaid: !isPaid })
                    setIsPaid(!isPaid)
                } catch (err) {
                    console.log(err)
                }
            }
            if (invoice.insurance?.name && invoice.insuranceAmount) {
                const amount = formatCurrency(invoice.insuranceAmount)

                return (
                    <div>
                        {invoice.insurance.name} :
                        <Badge
                            variant={isPaid ? 'creative' : 'destructive'}
                            className="hover:cursor-pointer md:ml-1"
                            onClick={toggleInsurancePayment}
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
        cell: function CellComponent({ row }) {
            const invoice = row.original
            const { refresh } = useRouter()
            const [open, setOpen] = useState(false)
            const closeModal = () => {
                setOpen(false)
            }

            const deleteInvoice = async () => {
                try {
                    await baraClientApi.delete(`/invoices/${invoice.id}`)
                } catch (err) {
                    console.log(err)
                } finally {
                    refresh()
                }
            }

            return (
                <div className="space-y-1 md:space-y-0 md:space-x-2">
                    <ResponsiveDialog
                        open={open}
                        onOpenChange={setOpen}
                        openButton={
                            <Button variant="outline" className="p-2">
                                <span className="sr-only">Modifier la facture</span>
                                <PencilIcon className="w-5" />
                            </Button>
                        }
                        title="Modifier la facture"
                    >
                        <InvoiceForm invoice={invoice} closeModal={closeModal} />
                    </ResponsiveDialog>

                    <Button variant="outline" className="p-2" onClick={deleteInvoice}>
                        <span className="sr-only">Supprimer la facture</span>
                        <TrashIcon className="w-5" />
                    </Button>
                </div>
            )
        },
    },
]
