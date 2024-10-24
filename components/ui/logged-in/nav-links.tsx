'use client'

import { BuildingOfficeIcon, DocumentDuplicateIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { SignedIn, UserButton } from '@clerk/nextjs'

const links = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    {
        name: 'Factures',
        href: '/invoices',
        icon: DocumentDuplicateIcon,
    },
    { name: 'Patients', href: '/patients', icon: UserGroupIcon },
    { name: 'Mutuelles', href: '/insurances', icon: BuildingOfficeIcon },
    { name: 'Clerk', href: '', icon: BuildingOfficeIcon, auth: true },
]

export default function NavLinks() {
    const pathname = usePathname()
    return (
        <>
            {links.map((link) => {
                if (link.auth) {
                    return (
                        <div
                            key="auth-clerk"
                            className="md:hidden flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                        >
                            <SignedIn>
                                <UserButton showName={false} />
                            </SignedIn>
                        </div>
                    )
                }

                const LinkIcon = link.icon
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}
