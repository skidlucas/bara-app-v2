import { Metadata } from 'next'
import { MENU } from '@/lib/menu'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { InsuranceForm } from '@/components/ui/insurances/insurance-form'

export const metadata: Metadata = {
    title: MENU.insurances.pages.create.label,
}

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: MENU.insurances.label, href: MENU.insurances.link },
                    {
                        label: MENU.insurances.pages.create.label,
                        href: MENU.insurances.pages.create.link,
                        active: true,
                    },
                ]}
            />
            <InsuranceForm />
        </main>
    )
}
