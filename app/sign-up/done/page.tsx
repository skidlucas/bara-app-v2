import { signUp } from '@/lib/api/auth.api'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Création du compte, redirection...',
}
export default async function Page() {
    try {
        await signUp()
        redirect('/dashboard')
    } catch (error) {
        console.error(error)
        redirect('/sign-up')
    }
}
