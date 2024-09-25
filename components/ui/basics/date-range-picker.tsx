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

    const handleDateChange = (range: DateRange | undefined) => {
        const params = new URLSearchParams(searchParams)

        if (range?.from && range?.to) {
            params.set('from', formatDateYYYYMMDD(range.from))
            params.set('to', formatDateYYYYMMDD(range.to))
            push(`${pathname}?${params.toString()}`)
        } else {
            push(pathname)
        }

        setDate(range)
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
                        onDayClick={(day) =>
                            setDate((prev) =>
                                prev?.to
                                    ? { from: day, to: undefined }
                                    : prev?.from
                                      ? { from: prev?.from, to: day }
                                      : { from: day, to: undefined },
                            )
                        }
                        // onSelect={(range) => handleDateChange(range)}
                        numberOfMonths={isDesktop ? 2 : 1}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
