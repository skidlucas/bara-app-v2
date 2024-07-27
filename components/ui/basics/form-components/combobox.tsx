import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { ValueLabel } from '@/lib/definitions'

import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Button } from '@/components/ui/basics/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/basics/command'
import { UseFormSetValue } from 'react-hook-form'
import { FormControl } from '@/components/ui/basics/form'

interface ComboboxProps {
    options: ValueLabel[]
    name: string
    value?: string
    setValue: UseFormSetValue<any>
    placeholder?: string
    isInModal?: boolean
}
export function FormCombobox({
    options,
    name,
    value,
    setValue,
    placeholder = 'Tapez pour chercher...',
    isInModal = false,
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen} modal={isInModal}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn('flex h-10 w-full justify-between', !value && 'text-muted-foreground')}
                    >
                        {value ? options.find((option) => option.value === value)?.label : 'Sélectionner...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            {/*To get exact same width as container : https://github.com/shadcn-ui/ui/issues/1690*/}
            <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandEmpty>Aucun résultat.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    value={option.label}
                                    key={option.value}
                                    onSelect={() => {
                                        setValue(name, option.value)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            option.value === value ? 'opacity-100' : 'opacity-0',
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
