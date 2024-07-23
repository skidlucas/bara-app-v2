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
import { Insurance, Invoice, Patient } from '@/lib/definitions'
import { clsx } from 'clsx'
import baraApi from '@/lib/api/client.api'
import baraClientApi from '@/lib/api/client.api'
import { useRouter } from 'next/navigation'
import { add } from 'date-fns'
import { useEffect, useState } from 'react'
import { getPatients } from '@/lib/api/entities/patient.api'
import { getInsurances } from '@/lib/api/entities/insurance.api'

const formSchema = z
    .object({
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
    .refine(
        (schema) => {
            return !(schema.insuranceAmount && !schema.insuranceId)
        },
        {
            message: `Ce montant ne peut pas être supérieur à 0 s'il n'y a pas de mutuelle sélectionnée`,
            path: ['insuranceAmount'],
        },
    )

export interface InvoiceFormValues extends z.infer<typeof formSchema> {}

interface InvoiceFormProps {
    invoice?: Invoice
    closeModal?: () => void
    patients?: Patient[]
    insurances?: Insurance[]
}
export function InvoiceForm({
    invoice,
    closeModal,
    patients: patientsFromPage,
    insurances: insurancesFromPage,
}: InvoiceFormProps) {
    const isUpdateForm = !!invoice
    const { push, refresh } = useRouter()
    const [patients, setPatients] = useState<Patient[]>(patientsFromPage || [])
    const [insurances, setInsurances] = useState<Insurance[]>(insurancesFromPage || [])
    const [selectedPatient, setSelectedPatient] = useState<Patient>()

    let defaultValues: InvoiceFormValues = {
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
            patientId: invoice.patient.id.toString(),
            insuranceId: invoice.insurance?.id.toString() ?? '',
            socialSecurityAmount: invoice.socialSecurityAmount / 100,
            isSocialSecurityPaid: invoice.isSocialSecurityPaid,
            insuranceAmount: invoice.insuranceAmount / 100,
            isInsurancePaid: invoice.isInsurancePaid,
        }
    }

    const form = useForm<InvoiceFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    useEffect(() => {
        const { watch, setValue } = form

        const subscription = watch((value, { name, type }) => {
            if (name === 'patientId' && type === 'change') {
                // watch for patientId field and change type
                const patient = patients.find((patient) => patient.id === parseInt(value.patientId ?? '0'))
                if (patient) {
                    setSelectedPatient(patient)
                    setValue('insuranceId', patient.insurance?.id.toString() || '')
                }
            }
        })
        return () => subscription.unsubscribe()
    }, [form, patients])

    useEffect(() => {
        const fetchPatients = async () => {
            const { patients } = await getPatients(baraClientApi, 1, 300)
            setPatients(patients)
        }

        if (!patients?.length) fetchPatients()
    }, [patients])

    useEffect(() => {
        const fetchInsurances = async () => {
            const { insurances } = await getInsurances(baraClientApi, 1, 300)
            setInsurances(insurances)
        }

        if (!insurances?.length) fetchInsurances()
    }, [insurances])

    const onSubmit = async (values: InvoiceFormValues) => {
        const invoiceToSave: Partial<Invoice> = {
            ...values,
            date: add(values.date, { hours: 12 }), // hack to make sure this is the correct date when translating to UTC
            patientId: parseInt(values.patientId, 10),
            insuranceId: (values.insuranceId && parseInt(values.insuranceId, 10)) || 0,
        }

        try {
            if (isUpdateForm) {
                await baraApi.patch(`/invoices/${invoice.id}`, invoiceToSave)
                if (closeModal) closeModal()
            } else {
                await baraApi.post(`/invoices`, invoiceToSave)
                push('/invoices')
            }
        } catch (err) {
            console.log(err)
        } finally {
            refresh()
        }
    }

    const patientOptions = patients.map((patient) => ({
        value: patient.id.toString(),
        label: `${patient.firstname} ${patient.lastname}`,
    }))

    const insuranceOptions = [{ value: '0', label: 'Pas de mutuelle' }]
    if (insurances?.length) {
        for (const insurance of insurances) {
            insuranceOptions.push({ value: insurance.id.toString(), label: insurance.name })
        }
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
                                <FormSelect field={field} placeholder="Choisir un patient" options={patientOptions} />
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
                                    value={selectedPatient?.insurance?.id.toString()}
                                    disabled={!!selectedPatient?.insurance?.id}
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
                <div className={clsx('mt-6 flex px-4 lg:px-0 justify-end space-x-2', { ['flex-col']: isUpdateForm })}>
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
