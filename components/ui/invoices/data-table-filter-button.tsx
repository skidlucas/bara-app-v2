'use client'

import { FunnelIcon } from '@heroicons/react/24/outline'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/basics/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/basics/dropdown-menu'

interface DataTableFilterButtonProps<TData> {
    table: Table<TData>
}

export function DataTableFilterButton<TData>({ table }: DataTableFilterButtonProps<TData>) {
    console.log(table.getState())

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 lg:flex">
                    <FunnelIcon className="w-5 mr-1" />
                    Filtrer
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => console.log('factures impayées')}>Factures impayées</DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('toutes')}>Toutes les factures</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
