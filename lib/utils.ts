import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, setDefaultOptions } from 'date-fns'
import { fr } from 'date-fns/locale'

setDefaultOptions({ locale: fr })

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    })
}

export const formatDateLocally = (date: Date | string) => {
    return format(date, 'PPP')
}

export const formatDateDDMMYYYY = (date: Date | string) => {
    return format(date, 'dd/MM/yyyy')
}

export const formatDateYYYYMMDD = (date: Date | string) => {
    return format(date, 'yyyy-MM-dd')
}
