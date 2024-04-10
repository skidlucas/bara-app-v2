import { KeyIcon } from '@heroicons/react/24/outline'

type PasswordInputProps = {
    name?: string
    label?: string
    placeholder?: string
}

export function PasswordInput({
    name = 'password',
    label = 'Mot de passe',
    placeholder = 'Votre de mot de passe',
}: Readonly<PasswordInputProps>) {
    return (
        <>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor={name}>
                {label}
            </label>
            <div className="relative">
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
