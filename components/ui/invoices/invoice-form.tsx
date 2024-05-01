'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/basics/form'
import { Button } from '@/components/ui/basics/button'
import Link from 'next/link'
import { MENU } from '@/lib/menu'
import { FormDatePicker } from '@/components/ui/basics/form-components/date-picker'
import { FormSelect } from '@/components/ui/basics/form-components/select'
import { Input } from '@/components/ui/basics/input'
import { Switch } from '@/components/ui/basics/switch'
import { Invoice } from '@/lib/definitions'
import { clsx } from 'clsx'

const formSchema = z.object({
    date: z.date({
        required_error: 'La date est obligatoire',
    }),
    patientId: z.string({
        required_error: 'Choisissez un patient',
    }),
    insuranceId: z.string().optional(),
    socialSecurityAmount: z.coerce.number().gt(0, 'Le montant de la CPAM devrait être supérieur à 0'),
    isSocialSecurityPaid: z.boolean(),
    insuranceAmount: z.coerce.number(),
    isInsurancePaid: z.boolean(),
})

export function InvoiceForm({ invoice }: { invoice?: Invoice }) {
    const isUpdateForm = !!invoice

    let defaultValues = {
        date: new Date(),
        patientId: '',
        insuranceId: '',
        socialSecurityAmount: 0,
        isSocialSecurityPaid: false,
        insuranceAmount: 0,
        isInsurancePaid: false,
    }

    if (isUpdateForm) {
        defaultValues = {
            date: new Date(invoice.date),
            patientId: invoice.patientId.toString(),
            insuranceId: invoice.insuranceId?.toString() ?? '0',
            socialSecurityAmount: invoice.socialSecurityAmount / 100,
            isSocialSecurityPaid: invoice.isSocialSecurityPaid,
            insuranceAmount: invoice.insuranceAmount / 100,
            isInsurancePaid: invoice.isInsurancePaid,
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-4 lg:grid-cols-8 gap-4 rounded-md bg-gray-50 p-4 lg:p-6">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col col-span-4">
                                <FormLabel>Date</FormLabel>
                                <FormDatePicker field={field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="hidden lg:block lg:col-span-4" />

                    <FormField
                        control={form.control}
                        name="patientId"
                        render={({ field }) => (
                            <FormItem className="col-span-4">
                                <FormLabel>Patient</FormLabel>
                                <FormSelect
                                    field={field}
                                    placeholder="Choisir un patient"
                                    options={[
                                        { value: '1', label: 'kamel' },
                                        { value: '2', label: 'nisqy' },
                                    ]}
                                />
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
                                    options={[
                                        { value: '0', label: 'pas de mutuelle' },
                                        { value: '1', label: 'tiky' },
                                        { value: '2', label: 'trayton' },
                                    ]}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="socialSecurityAmount"
                        render={({ field }) => (
                            <FormItem className="col-span-2 lg:col-span-3">
                                <FormLabel>Montant CPAM</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="col-span-2 lg:col-span-1 place-self-center">
                        <FormField
                            control={form.control}
                            name="isSocialSecurityPaid"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 space-y-0 pt-8 px-8">
                                    <FormLabel>Payé</FormLabel>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="insuranceAmount"
                        render={({ field }) => (
                            <FormItem className="col-span-2 lg:col-span-3">
                                <FormLabel>Montant Mutuelle</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="col-span-2 lg:col-span-1 place-self-center">
                        <FormField
                            control={form.control}
                            name="isInsurancePaid"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 space-y-0 pt-8 px-8">
                                    <FormLabel>Payé</FormLabel>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className={clsx('mt-6 flex px-4 lg:px-0 justify-end', { ['flex-col']: isUpdateForm })}>
                    {!isUpdateForm && (
                        <Link
                            href={MENU.invoices.link}
                            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                        >
                            Annuler
                        </Link>
                    )}

                    <Button type="submit">{isUpdateForm ? 'Modifier la facture' : 'Ajouter la facture'}</Button>
                </div>
            </form>
        </Form>
    )
}
