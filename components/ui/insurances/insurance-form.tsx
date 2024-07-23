'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/basics/form'
import { Button } from '@/components/ui/basics/button'
import Link from 'next/link'
import { MENU } from '@/lib/menu'
import { Input } from '@/components/ui/basics/input'
import { clsx } from 'clsx'
import baraApi from '@/lib/api/client.api'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    name: z.string().min(1, 'Le nom est requis'),
    amcNumber: z.string().optional(),
})

export interface InsuranceFormValues extends z.infer<typeof formSchema> {}

export function InsuranceForm() {
    const { push, refresh } = useRouter()

    const defaultValues: InsuranceFormValues = {
        name: '',
        amcNumber: '',
    }

    const form = useForm<InsuranceFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const onSubmit = async (values: InsuranceFormValues) => {
        try {
            await baraApi.post(`/insurances`, values)
            push('/insurances')
            refresh()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-md bg-gray-50 p-4 lg:p-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="amcNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Numéro AMC</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="hidden lg:block lg:col-span-4" />
                </div>
                <div className={clsx('mt-6 flex px-4 lg:px-0 justify-end space-x-2')}>
                    <Link
                        href={MENU.insurances.link}
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Annuler
                    </Link>

                    <Button type="submit">Ajouter la mutuelle</Button>
                </div>
            </form>
        </Form>
    )
}
