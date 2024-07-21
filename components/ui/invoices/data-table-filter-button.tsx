'use client'

import { FunnelIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/basics/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/basics/dropdown-menu'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Badge } from '@/components/ui/basics/badge'

export function DataTableFilterButton() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const [typeOfUnpaidInvoices, setTypeOfUnpaidInvoices] = useState('')

    const handleFilter = useCallback(
        (typeOfUnpaidInvoices: string) => {
            const params = new URLSearchParams(searchParams)
            if (typeOfUnpaidInvoices) {
                params.set('unpaid', typeOfUnpaidInvoices)
            } else {
                params.delete('unpaid')
            }
            replace(`${pathname}?${params.toString()}`)
        },
        [searchParams, pathname, replace],
    )

    useEffect(() => {
        handleFilter(typeOfUnpaidInvoices)
    }, [typeOfUnpaidInvoices, handleFilter])

    return (
        <div className="flex flex-row gap-2">
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
                        Factures Mutuelle impayées
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTypeOfUnpaidInvoices('')}>Toutes les factures</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {typeOfUnpaidInvoices && (
                <Badge variant={'outline'} className="hover:cursor-pointer" onClick={() => setTypeOfUnpaidInvoices('')}>
                    {typeOfUnpaidInvoices === 'socialSecurity'
                        ? 'Factures CPAM impayées'
                        : 'Factures Mutuelle impayées'}
                </Badge>
            )}
        </div>
    )
}
