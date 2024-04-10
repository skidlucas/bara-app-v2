import { AtSymbolIcon } from '@heroicons/react/24/outline'

export default function EmailInput() {
    return (
        <>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
                Email
            </label>
            <div className="relative">
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Votre adresse email"
                    required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </>
    )
}
