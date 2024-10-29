import { Metadata } from 'next'
import { MENU } from '@/lib/menu'
import { lusitana } from '@/components/ui/fonts'
import Search from '@/components/ui/search'
import { Suspense } from 'react'
import { InvoicesTableSkeleton } from '@/components/ui/skeletons'
import { columns } from '@/components/ui/insurances/columns'
import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { DataTable } from '@/components/ui/data-table'
import { getInsurances } from '@/lib/api/entities/insurance.api'
import baraServerApi from '@/lib/api/server.api'

export const metadata: Metadata = {
    title: 'Mutuelles',
}
export default async function Page(props: {
    searchParams?: Promise<{
        search?: string
        page?: string
    }>
}) {
    const searchParams = await props.searchParams
    const search = searchParams?.search ?? ''
    const currentPage = Number(searchParams?.page) || 1
    const limit = 10

    const { insurances, totalItems } = await getInsurances(baraServerApi, currentPage, limit, search)

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>{MENU.insurances.label}</h1>
            </div>
            <div className="mt-4 flex items-center justify-between md:mt-8 space-x-2">
                <Search placeholder="Chercher une mutuelle..." />
                <Link
                    href={MENU.insurances.pages.create.link}
                    className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <span className="hidden md:block">{MENU.insurances.pages.create.label}</span>
                    <PlusIcon className="h-5 md:ml-4" />
                </Link>
            </div>
            <Suspense key={search + currentPage} fallback={<InvoicesTableSkeleton />}>
                <DataTable columns={columns} data={insurances} totalItems={totalItems} limit={limit} />
            </Suspense>
        </div>
    )
}
