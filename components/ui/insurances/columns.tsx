'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Insurance } from '@/lib/definitions'

export const columns: ColumnDef<Insurance>[] = [
    {
        accessorKey: 'name',
        header: 'Nom',
        cell: ({ row }) => {
            return row.original.name
        },
    },
    {
        accessorKey: 'amcNumber',
        header: 'Numéro AMC',
        cell: ({ row }) => {
            return row.original.amcNumber
        },
    },
]
