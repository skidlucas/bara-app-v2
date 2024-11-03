import { signUp } from '@/lib/api/auth.api'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Création du compte, redirection...',
}

export default async function Page() {
    let redirectUrl = '/'
    try {
        await signUp()
        redirectUrl = '/dashboard'
    } catch (error) {
        console.error(error)
        redirectUrl = '/sign-up'
    } finally {
        redirect(redirectUrl)
    }
}
