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
import { Insurance, Patient } from '@/lib/definitions'
import { FormSelect } from '@/components/ui/basics/form-components/select'

const formSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    insuranceId: z.string().optional(),
})

export interface PatientFormValue extends z.infer<typeof formSchema> {}

export function PatientForm({ insurances }: { insurances: Insurance[] }) {
    const { push, refresh } = useRouter()

    const defaultValues: PatientFormValue = {
        firstname: '',
        lastname: '',
        insuranceId: '',
    }

    const form = useForm<PatientFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const onSubmit = async (values: PatientFormValue) => {
        const patientToSave: Partial<Patient> = {
            ...values,
            insuranceId: (values.insuranceId && parseInt(values.insuranceId, 10)) || 0,
        }

        try {
            await baraApi.post(`/patients`, patientToSave)
            push('/patients')
            refresh()
        } catch (err) {
            console.log(err)
        }
    }

    const insuranceOptions = [{ value: '0', label: 'Pas de mutuelle' }]
    if (insurances.length) {
        for (const insurance of insurances) {
            insuranceOptions.push({ value: insurance.id.toString(), label: insurance.name })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-md bg-gray-50 p-4 lg:p-6">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom de famille</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="insuranceId"
                        render={({ field }) => (
                            <FormItem className="col-span-4">
                                <FormLabel>Mutuelle</FormLabel>
                                <FormSelect
                                    field={field}
                                    placeholder="Choisir une mutuelle"
                                    options={insuranceOptions}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="hidden lg:block lg:col-span-4" />
                </div>
                <div className={clsx('mt-6 flex px-4 lg:px-0 justify-end space-x-2')}>
                    <Link
                        href={MENU.patients.link}
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Annuler
                    </Link>

                    <Button type="submit">Ajouter le patient</Button>
                </div>
            </form>
        </Form>
    )
}
