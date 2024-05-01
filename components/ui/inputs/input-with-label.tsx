import React from 'react'
import { Input } from '@/components/ui/basics/input'

type InputProps = {
    id: string
    type?: string
    name: string
    label: string
    placeholder?: string
    required?: boolean
    icon?: React.ReactNode
}

export function InputWithLabel({ id, type = 'text', name, label, placeholder, required = false, icon }: InputProps) {
    return (
        <>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor={name}>
                {label}
            </label>
            <div className="relative">
                <Input
                    className="pl-10"
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
