import { Metadata } from 'next'
import { MENU } from '@/lib/menu'
import { lusitana } from '@/components/ui/fonts'
import Search from '@/components/ui/search'
import { Suspense } from 'react'
import { InvoicesTableSkeleton } from '@/components/ui/skeletons'
import { columns } from '@/components/ui/insurances/columns'
import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import baraApi from '@/lib/api/server.api'
import { DataTable } from '@/components/ui/data-table'

export const metadata: Metadata = {
    title: 'Mutuelles',
}
export default async function Page({
    searchParams,
}: {
    searchParams?: {
        search?: string
        page?: string
    }
}) {
    const search = searchParams?.search ?? ''
    const currentPage = Number(searchParams?.page) || 1
    const limit = 10

    const getInsurances = async () => {
        const queryParams: any = {
            page: currentPage,
            limit,
        }

        if (search) {
            queryParams.search = search
        }

        const searchParams = new URLSearchParams(queryParams)

        try {
            const { data } = await baraApi.get(`/insurances?${searchParams.toString()}`)
            return { insurances: data.data, totalItems: data.totalItems }
        } catch (error) {
            console.error(error)
            return { insurances: [], totalItems: 0 }
        }
    }

    const { insurances, totalItems } = await getInsurances()

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>{MENU.insurances.label}</h1>
            </div>
            <div className="mt-4 flex items-center justify-between md:mt-8 space-x-2">
                <Search placeholder="Chercher une mutuelle..." />
                <Link
                    href={MENU.insurances.pages.create.link}
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
