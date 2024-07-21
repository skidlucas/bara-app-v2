export const MENU = {
    dashboard: {
        label: 'Dashboard',
        link: '/logged-in',
    },
    invoices: {
        label: 'Factures',
        link: '/invoices',
        pages: {
            create: {
                label: 'Ajouter une facture',
                link: '/invoices/create',
            },
        },
    },
    patients: {
        label: 'Patients',
        link: '/patients',
        pages: {
            create: {
                label: 'Ajouter un patient',
                link: '/patients/create',
            },
        },
    },
    insurances: {
        label: 'Mutuelles',
        link: '/insurances',
        pages: {
            create: {
                label: 'Ajouter une mutuelle',
                link: '/insurances/create',
            },
        },
    },
}
