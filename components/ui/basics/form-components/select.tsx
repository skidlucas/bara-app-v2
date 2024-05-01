import * as React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/basics/select'
import { ValueLabel } from '@/lib/definitions'

export function FormSelect({
    field,
    placeholder,
    options,
}: {
    field: any
    placeholder: string
    options: ValueLabel[]
}) {
    return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
