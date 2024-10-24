'use client'

import Link from 'next/link'
import NavLinks from '@/components/ui/logged-in/nav-links'
import BaraLogo from '@/components/ui/bara-logo'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { useDesktop } from '@/lib/hooks/use-media-query'

export default function SideNav() {
    const isDesktop = useDesktop()

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link className="flex justify-center mb-2" href="/dashboard">
                <BaraLogo isDesktop={isDesktop} />
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
                <div className="hidden md:flex justify-center md:rounded-md md:bg-gray-100 h-[48px]">
                    <SignedIn>
                        <UserButton showName={isDesktop} />
                    </SignedIn>
                </div>
            </div>
        </div>
    )
}
