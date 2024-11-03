import { Metadata } from 'next'
import { MENU } from '@/lib/menu'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { InvoiceForm } from '@/components/ui/invoices/invoice-form'
import { getPatients } from '@/lib/api/patient.api'
import { getInsurances } from '@/lib/api/insurance.api'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: MENU.invoices.pages.create.label,
}

export default async function Page() {
    const { patients } = await getPatients(1, 1000)
    const { insurances } = await getInsurances(1, 1000)

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
