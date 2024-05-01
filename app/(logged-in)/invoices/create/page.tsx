import { Metadata } from 'next'
import { MENU } from '@/lib/menu'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { InvoiceForm } from '@/components/ui/invoices/invoice-form'

export const metadata: Metadata = {
    title: MENU.invoices.pages.create.label,
}
export default async function Page() {
    // todo load customers and pass them to invoiceForm
    // const customers = await fetchCustomers()

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
            <InvoiceForm />
        </main>
    )
}
