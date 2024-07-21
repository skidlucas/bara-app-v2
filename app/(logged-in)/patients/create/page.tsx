import { Metadata } from 'next'
import { MENU } from '@/lib/menu'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { PatientForm } from '@/components/ui/patients/patient-form'

export const metadata: Metadata = {
    title: MENU.patients.pages.create.label,
}

export default async function Page() {
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
            <PatientForm />
        </main>
    )
}
