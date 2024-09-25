'use client'

import * as React from 'react'
import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn, formatDateYYYYMMDD } from '@/lib/utils'
import { Button } from '@/components/ui/basics/button'
import { Calendar } from '@/components/ui/basics/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/basics/popover'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDesktop } from '@/lib/hooks/use-media-query'

interface DateRangerPickerProps extends React.HTMLAttributes<HTMLDivElement> {
    from: Date
    to: Date
}
export function DateRangePicker({ className, from, to }: DateRangerPickerProps) {
    const [date, setDate] = useState<DateRange | undefined>({
        from,
        to,
    })

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { push } = useRouter()
    const isDesktop = useDesktop()

    const handleDayClick = (day: Date) => {
        const params = new URLSearchParams(searchParams)

        setDate((prev) => {
            let newState: DateRange | undefined

            if (prev?.to) {
                // If 'to' is already set, reset the range
                newState = { from: day, to: undefined }
            } else if (prev?.from) {
                // If 'from' is set and 'to' is not
                if (day < prev?.from) {
                    // If the new day is before the 'from' date, reset the range
                    return { from: day, to: undefined }
                } else {
                    // Otherwise, set the 'to' date
                    params.set('from', formatDateYYYYMMDD(prev?.from))
                    params.set('to', formatDateYYYYMMDD(day))
                    push(`${pathname}?${params.toString()}`)
                    newState = { from: prev?.from, to: day }
                }
            } else {
                // If neither 'from' nor 'to' is set, set 'from'
                newState = { from: day, to: undefined }
            }

            if (!prev?.from) {
                push(pathname)
            }

            return newState
        })
    }

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-[300px] justify-start text-left font-normal',
                            !date && 'text-muted-foreground',
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Choisir une date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onDayClick={(day) => handleDayClick(day)}
                        numberOfMonths={isDesktop ? 2 : 1}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
