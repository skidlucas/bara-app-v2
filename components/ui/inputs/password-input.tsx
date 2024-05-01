import { KeyIcon } from '@heroicons/react/24/outline'
import { Input } from '@/components/ui/basics/input'

type PasswordInputProps = {
    name?: string
    label?: string
    placeholder?: string
}

export function PasswordInput({
    name = 'password',
    label = 'Mot de passe',
    placeholder = 'Votre de mot de passe',
}: PasswordInputProps) {
    return (
        <>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor={name}>
                {label}
            </label>
            <div className="relative">
                <Input
                    className="pl-10"
                    id={name}
                    type="password"
                    name={name}
                    placeholder={placeholder}
                    required
                    minLength={8}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </>
    )
}
