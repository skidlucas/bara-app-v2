import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/components/ui/fonts'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: {
        template: 'Bara | %s',
        default: 'Bara',
    },
    description: 'Application pour la gestion des factures chez les kinésithérapeute',
    metadataBase: new URL('https://www.bara.ninja'),
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="fr">
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    )
}
