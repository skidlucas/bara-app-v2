import { Metadata } from 'next'
import { MENU } from '@/lib/menu'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { InvoiceForm } from '@/components/ui/invoices/invoice-form'
import { getInsurances } from '@/lib/api/entities/insurance.api'
import { getPatients } from '@/lib/api/entities/patient.api'
import baraServerApi from '@/lib/api/server.api'

export const metadata: Metadata = {
    title: MENU.invoices.pages.create.label,
}

export default async function Page() {
    const { patients } = await getPatients(baraServerApi, 1, 1000, null, true)
    const { insurances } = await getInsurances(baraServerApi, 1, 1000)

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: MENU.invoices.label, href: MENU.invoices.link },
                    {
                        label: MENU.invoices.pages.create.label,
                        href: MENU.invoices.pages.create.link,
                        active: true,
                    },
                ]}
            />
            <InvoiceForm patients={patients} insurances={insurances} />
        </main>
    )
}
