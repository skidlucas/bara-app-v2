import Link from 'next/link'
import NavLinks from '@/components/ui/logged-in/nav-links'
import { PowerIcon } from '@heroicons/react/24/outline'
import { signOut } from '@/auth'
import BaraLogo from '@/components/ui/bara-logo'
import { Button } from '@/components/ui/basics/button'

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40" href="/public">
                <div className="w-32 text-white md:w-40">
                    <BaraLogo />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form
                    action={async () => {
                        'use server'
                        await signOut()
                    }}
                >
                    <Button className="h-[48px] w-full">
                        <PowerIcon className="w-6 mr-1" />
                        <div className="hidden md:block">Se déconnecter</div>
                    </Button>
                </form>
            </div>
        </div>
    )
}
