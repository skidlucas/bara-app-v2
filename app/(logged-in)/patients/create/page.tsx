export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { MENU } from '@/lib/menu'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { PatientForm } from '@/components/ui/patients/patient-form'
import { getInsurances } from '@/lib/api/insurance.api'

export const metadata: Metadata = {
    title: MENU.patients.pages.create.label,
}

export default async function Page() {
    const { insurances } = await getInsurances(1, 300)

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: MENU.patients.label, href: MENU.patients.link },
                    {
                        label: MENU.patients.pages.create.label,
                        href: MENU.patients.pages.create.link,
                        active: true,
                    },
                ]}
            />
            <PatientForm insurances={insurances} />
        </main>
    )
}
