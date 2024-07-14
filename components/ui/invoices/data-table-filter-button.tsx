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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface DataTableFilterButtonProps<TData> {
    table: Table<TData>
}

export function DataTableFilterButton<TData>({ table }: DataTableFilterButtonProps<TData>) {
    console.log(table)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const [typeOfUnpaidInvoices, setTypeOfUnpaidInvoices] = useState('')

    const handleFilter = () => {
        const params = new URLSearchParams(searchParams)
        if (typeOfUnpaidInvoices) {
            params.set('unpaid', typeOfUnpaidInvoices)
        } else {
            params.delete('unpaid')
        }
        replace(`${pathname}?${params.toString()}`)
    }

    useEffect(() => {
        console.log('x')
        handleFilter()
    }, [typeOfUnpaidInvoices, handleFilter])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 lg:flex">
                    <FunnelIcon className="w-5 mr-1" />
                    Filtrer
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setTypeOfUnpaidInvoices('socialSecurity')}>
                    Factures CPAM impayées
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeOfUnpaidInvoices('insurance')}>
                    Facture Mutuelle impayées
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeOfUnpaidInvoices('')}>Toutes les factures</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
