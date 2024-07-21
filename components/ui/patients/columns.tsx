'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Patient } from '@/lib/definitions'

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
]
