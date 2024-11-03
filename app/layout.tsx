import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/components/ui/fonts'
import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
    title: {
        template: 'Bara | %s',
        default: 'Bara',
    },
    description: 'Application pour la gestion des factures chez les kinésithérapeutes',
    metadataBase: new URL('https://bara.lukapps.fr'),
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="fr">
            <body className={`${inter.className} antialiased`}>
                <ClerkProvider afterSignOutUrl="/sign-in">{children}</ClerkProvider>
            </body>
        </html>
    )
}
