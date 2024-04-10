'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { lusitana } from '@/components/ui/fonts'
import { UserIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/ui/button'
import { signUp } from '@/lib/actions/auth'
import EmailInput from '@/components/ui/inputs/email-input'
import { PasswordInput } from '@/components/ui/inputs/password-input'
import { Input } from '@/components/ui/inputs/input'

export default function SignUpForm() {
    const initialState = { message: '', errors: {} }
    const [state, dispatch] = useFormState(signUp, initialState)

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl text-gray-900`}>S&apos;inscrire</h1>
                <p className="text-xs text-gray-900">Vous avez déjà un compte ? Se connecter </p>
                <div className="w-full">
                    <div>
                        <Input
                            id="firstname"
                            name="firstname"
                            label="Prénom"
                            placeholder="Votre prénom"
                            required
                            icon={
                                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            }
                        />
                        <div id="firstname-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.firstname?.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                        </div>
                        <EmailInput />
                        <div id="email-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.email?.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <PasswordInput />
                        <div id="password-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.password?.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <PasswordInput label="Confirmer le mot de passe" name="confirmPassword" />
                        <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.confirmPassword?.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div id="error" aria-live="polite" aria-atomic="true">
                    {state.message && (
                        <p className="mt-2 text-sm text-red-500" key={state.message}>
                            {state.message}
                        </p>
                    )}
                </div>
                <LoginButton />
                <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true"></div>
            </div>
        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            S&apos;inscrire <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    )
}
