import { Metadata } from 'next'
import { MENU } from '@/lib/menu'
import { lusitana } from '@/components/ui/fonts'
import Search from '@/components/ui/search'
import { Suspense } from 'react'
import { InvoicesTableSkeleton } from '@/components/ui/skeletons'
import { columns } from '@/components/ui/invoices/columns'
import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import baraServerApi from '@/lib/api/server.api'
import { DataTable } from '@/components/ui/data-table'

export const metadata: Metadata = {
    title: 'Factures',
}
export default async function Page(props: {
    searchParams?: Promise<{
        search?: string
        page?: string
        unpaid?: string
    }>
}) {
    const searchParams = await props.searchParams
    const search = searchParams?.search ?? ''
    const currentPage = Number(searchParams?.page) || 1
    const unpaid = searchParams?.unpaid ?? ''
    const limit = 10

    const getInvoices = async () => {
        const queryParams: any = {
            page: currentPage,
            limit,
        }

        if (search) {
            queryParams.search = search
        }

        if (unpaid) {
            queryParams.unpaid = unpaid
        }
        const searchParams = new URLSearchParams(queryParams)

        try {
            const { data } = await baraServerApi.get(`/invoices?${searchParams.toString()}`)
            return { invoices: data.data, totalItems: data.totalItems }
        } catch (error) {
            console.error(error)
            return { invoices: [], totalItems: 0 }
        }
    }

    const { invoices, totalItems } = await getInvoices()

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>{MENU.invoices.label}</h1>
            </div>
            <div className="mt-4 flex items-center justify-between md:mt-8 space-x-2">
                <Search placeholder="Chercher une facture..." />
                <Link
                    href={MENU.invoices.pages.create.link}
                    className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <span className="hidden md:block">{MENU.invoices.pages.create.label}</span>
                    <PlusIcon className="h-5 md:ml-4" />
                </Link>
            </div>
            <Suspense key={search + currentPage} fallback={<InvoicesTableSkeleton />}>
                <DataTable
                    columns={columns}
                    data={invoices}
                    totalItems={totalItems}
                    limit={limit}
                    enableSelect
                    type="invoice"
                />
            </Suspense>
        </div>
    )
}
