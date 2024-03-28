import { Metadata } from 'next'
import React from 'react'
import SignUpForm from '@/app/ui/sign-up-form'
import BaraLogo from '@/app/ui/bara-logo'

export const metadata: Metadata = {
    title: 'Créer un compte',
}
export default function SignUpPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <BaraLogo />
                    </div>
                </div>
                <SignUpForm />
            </div>
        </main>
    )
}
