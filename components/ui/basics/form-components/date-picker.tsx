'use client'

import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn, formatDateLocally } from '@/lib/utils'
import { Button } from '@/components/ui/basics/button'
import { Calendar } from '@/components/ui/basics/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/basics/popover'
import { FormControl } from '@/components/ui/basics/form'

export function FormDatePicker({ field }: any) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={'outline'}
                        className={cn('justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? formatDateLocally(field.value) : <span>Choisir une date</span>}
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                />
            </PopoverContent>
        </Popover>
    )
}
