'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/basics/table'
import { Button } from '@/components/ui/basics/button'
import { DataTableActionButtons } from '@/components/ui/invoices/data-table-action-buttons'
import { DataTableFilterButton } from '@/components/ui/invoices/data-table-filter-button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    totalItems: number
    limit: number
    enableSelect?: boolean
    type?: 'invoice' | 'insurance' | 'patient'
}

export function DataTable<TData, TValue>({
    columns,
    data,
    totalItems,
    limit,
    enableSelect = false,
    type,
}: DataTableProps<TData, TValue>) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { push } = useRouter()

    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState({
        pageIndex: +(searchParams.get('page') ?? 1) - 1,
        pageSize: limit,
    })

    const handlePagination = (updater: any) => {
        const newPageInfo = updater(table.getState().pagination)

        const params = new URLSearchParams(searchParams)
        params.set('page', newPageInfo.pageIndex + 1)
        push(`${pathname}?${params.toString()}`)
        setPagination(newPageInfo)
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: totalItems,
        onPaginationChange: (updater) => handlePagination(updater),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
            pagination,
        },
    })

    const nbRowsSelected = table.getFilteredSelectedRowModel().rows.length
    const nbRowsDisplayed = table.getFilteredRowModel().rows.length

    return (
        <div className="mt-6">
            {type === 'invoice' && (
                <div className="flex items-center justify-between">
                    <DataTableFilterButton />
                    <DataTableActionButtons table={table} />
                </div>
            )}
            <div className="rounded-md border mt-2">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Aucun résultat
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div
                className={`flex ${enableSelect ? 'justify-between' : 'justify-end'}  text-sm text-muted-foreground mt-1`}
            >
                {enableSelect && (
                    <div>
                        {nbRowsSelected <= 1
                            ? `${nbRowsSelected} élément sélectionné`
                            : `${nbRowsSelected} élements sélectionnés `}{' '}
                        sur {nbRowsDisplayed}
                    </div>
                )}

                <div>
                    {pagination.pageIndex * pagination.pageSize + nbRowsDisplayed} / {totalItems} éléments
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Précédent
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Suivant
                </Button>
            </div>
        </div>
    )
}
