import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/app/ui/fonts'

export const metadata: Metadata = {
    title: {
        template: 'Bara | %s',
        default: 'Bara',
    },
    description: 'Application pour la gestion des factures chez les kinésithérapeute',
    metadataBase: new URL('https://www.bara.ninja'),
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fr">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
