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
    },
    insurances: {
        label: 'Mutuelles',
        link: '/insurances',
    },
}
