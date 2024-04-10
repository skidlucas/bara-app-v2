import { Metadata } from 'next'
import BaraLogo from '@/components/ui/bara-logo'
import LoginForm from '@/components/ui/login-form'

export const metadata: Metadata = {
    title: 'Se connecter',
}

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <BaraLogo />
                    </div>
                </div>
                <LoginForm />
            </div>
        </main>
    )
}
