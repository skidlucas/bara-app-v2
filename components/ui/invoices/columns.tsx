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
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/basics/alert-dialog'
import { deleteInvoice, toggleInvoicePayment } from '@/lib/api/invoice.api'

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

            // if the value is changed externally, sync it up with our state
            useEffect(() => {
                setIsPaid(row.original.isSocialSecurityPaid)
            }, [row])

            const toggleSocialSecurityPayment = async () => {
                try {
                    await toggleInvoicePayment(invoice.id, { isSocialSecurityPaid: !isPaid })
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

            // if the value is changed externally, sync it up with our state
            useEffect(() => {
                setIsPaid(row.original.isInsurancePaid)
            }, [row])

            const toggleInsurancePayment = async () => {
                try {
                    await toggleInvoicePayment(invoice.id, { isInsurancePaid: !isPaid })
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

            const deleteCurrentInvoice = async () => {
                try {
                    await deleteInvoice(invoice.id)
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

                    <AlertDialog>
                        <AlertDialogTrigger className="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
                            <span className="sr-only">Supprimer la facture</span>
                            <TrashIcon className="w-5" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Êtes-vous sûr(e) ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Cette action ne peut pas être annulée. Cela supprimera définitivement la facture
                                    sélectionnée.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={deleteCurrentInvoice}>Supprimer</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        },
    },
]
