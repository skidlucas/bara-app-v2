import React from 'react'

type InputProps = {
    id: string
    type?: string
    name: string
    label: string
    placeholder?: string
    required?: boolean
    icon?: React.ReactNode
}

export function Input({ id, type = 'text', name, label, placeholder, required = false, icon }: Readonly<InputProps>) {
    return (
        <>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor={name}>
                {label}
            </label>
            <div className="relative">
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id={id}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                />
                {icon}
            </div>
        </>
    )
}
