import { Metadata } from 'next'
import { MENU } from '@/lib/menu'
import { lusitana } from '@/components/ui/fonts'
import Search from '@/components/ui/search'
import { Suspense } from 'react'
import { InvoicesTableSkeleton } from '@/components/ui/skeletons'
import { InvoicesTable } from '@/components/ui/invoices/data-table'
import { columns } from '@/components/ui/invoices/columns'
import { fakeInvoices } from '@/components/ui/invoices/fixtures'
import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Factures',
}
export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string
        page?: string
    }
}) {
    const query = searchParams?.query ?? ''
    const currentPage = Number(searchParams?.page) || 1

    // todo fetch invoices here
    const invoices = fakeInvoices

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>{MENU.invoices.label}</h1>
            </div>
            <div className="mt-4 flex items-center justify-between md:mt-8">
                <Search placeholder="Chercher une facture..." />
                <Link
                    href={MENU.invoices.pages.create.link}
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <span className="hidden md:block">{MENU.invoices.pages.create.label}</span>
                    <PlusIcon className="h-5 md:ml-4" />
                </Link>
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <InvoicesTable columns={columns} data={invoices} />
                {/*<Table query={query} currentPage={currentPage} />*/}
            </Suspense>
        </div>
    )
}
