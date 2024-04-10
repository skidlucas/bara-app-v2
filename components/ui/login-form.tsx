'use client'

import { lusitana } from '@/components/ui/fonts'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '@/lib/actions/auth'
import { Button } from '@/components/ui/button'
import EmailInput from '@/components/ui/inputs/email-input'
import { PasswordInput } from '@/components/ui/inputs/password-input'

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>Veuillez vous connecter pour continuer.</h1>
                <div className="w-full">
                    <div>
                        <EmailInput />
                    </div>
                    <div className="mt-4">
                        <PasswordInput />
                    </div>
                </div>
                <LoginButton />
                <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                    {errorMessage && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>
            </div>
        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Se connecter <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    )
}
