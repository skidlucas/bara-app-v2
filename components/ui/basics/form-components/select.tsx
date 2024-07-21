import * as React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/basics/select'
import { ValueLabel } from '@/lib/definitions'

export function FormSelect({
    field,
    placeholder,
    options,
    value,
    disabled = false,
}: {
    field: any
    placeholder: string
    options: ValueLabel[]
    value?: string
    disabled?: boolean
}) {
    return (
        <Select onValueChange={field.onChange} defaultValue={field.value} value={value} disabled={disabled}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map(({ value, label }) => (
                    <SelectItem value={value} key={value}>
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
