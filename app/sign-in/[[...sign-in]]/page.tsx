import { Metadata } from 'next'
import React from 'react'
import { SignIn } from '@clerk/nextjs'

export const metadata: Metadata = {
    title: 'Se connecter',
}
export default function Page() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <SignIn />
            </div>
        </main>
    )
}
