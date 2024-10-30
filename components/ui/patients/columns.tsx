'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Patient } from '@/lib/definitions'
import { useState } from 'react'
import { ResponsiveDialog } from '@/components/ui/basics/responsive-dialog'
import { Button } from '@/components/ui/basics/button'
import { PencilIcon } from '@heroicons/react/24/outline'
import { PatientForm } from '@/components/ui/patients/patient-form'

export const columns: ColumnDef<Patient>[] = [
    {
        accessorKey: 'name',
        header: 'Nom',
        cell: ({ row }) => {
            return `${row.original.firstname} ${row.original.lastname}`
        },
    },
    {
        accessorKey: 'insurance',
        header: 'Mutuelle',
        cell: ({ row }) => {
            return row.original.insurance?.name
        },
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: function CellComponent({ row }) {
            const patient = row.original
            const [open, setOpen] = useState(false)
            const closeModal = () => {
                setOpen(false)
            }

            return (
                <div className="space-y-1 md:space-y-0 md:space-x-2">
                    <ResponsiveDialog
                        open={open}
                        onOpenChange={setOpen}
                        openButton={
                            <Button variant="outline" className="p-2">
                                <span className="sr-only">Modifier le patient</span>
                                <PencilIcon className="w-5" />
                            </Button>
                        }
                        title="Modifier le patient"
                    >
                        <PatientForm patient={patient} closeModal={closeModal} isInModal={true} />
                    </ResponsiveDialog>
                </div>
            )
        },
    },
]
