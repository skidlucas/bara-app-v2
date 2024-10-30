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
import baraClientApi from '@/lib/api/client.api'
import { useRouter } from 'next/navigation'
import { Insurance, Patient } from '@/lib/definitions'
import { FormCombobox } from '@/components/ui/basics/form-components/combobox'
import { useEffect, useState } from 'react'
import { getInsurances } from '@/lib/api/entities/insurance.api'

const formSchema = z.object({
    firstname: z.string().min(1, 'Le prénom est requis'),
    lastname: z.string().min(1, 'Le nom de famille est requis'),
    insuranceId: z.string().optional(),
})

export interface PatientFormValue extends z.infer<typeof formSchema> {}

interface PatientFormProps {
    patient?: Patient
    isInModal?: boolean
    closeModal?: () => void
    insurances?: Insurance[]
    handlePatientCreated?: (patient: Patient) => void
}

export function PatientForm({
    patient,
    isInModal = false,
    closeModal,
    insurances: insurancesFromPage,
    handlePatientCreated,
}: PatientFormProps) {
    const isUpdateForm = !!patient
    const { push, refresh } = useRouter()
    const [insurances, setInsurances] = useState<Insurance[]>(insurancesFromPage || [])

    let defaultValues: PatientFormValue = {
        firstname: '',
        lastname: '',
        insuranceId: '',
    }

    if (isUpdateForm) {
        defaultValues = {
            firstname: patient.firstname,
            lastname: patient.lastname,
            insuranceId: patient.insurance?.id.toString() ?? '',
        }
    }

    useEffect(() => {
        const fetchInsurances = async () => {
            const { insurances } = await getInsurances(baraClientApi, 1, 300)
            setInsurances(insurances)
        }

        if (!insurances?.length) fetchInsurances()
    }, [insurances])

    const form = useForm<PatientFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const { setValue } = form

    const onSubmit = async (values: PatientFormValue) => {
        const patientToSave: Partial<Patient> = {
            ...values,
            insuranceId: (values.insuranceId && parseInt(values.insuranceId, 10)) || 0,
        }

        try {
            if (isUpdateForm) {
                await baraClientApi.patch(`/patients/${patient.id}`, patientToSave)
                if (closeModal) closeModal()
            } else {
                const res = await baraClientApi.post(`/patients`, patientToSave)
                if (!isInModal) push('/patients')
                if (handlePatientCreated && res.data) handlePatientCreated(res.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            refresh()
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
                            <FormItem>
                                <FormLabel>Mutuelle</FormLabel>
                                <FormCombobox
                                    options={insuranceOptions}
                                    name={field.name}
                                    value={field.value}
                                    setValue={setValue}
                                    placeholder="Choisir une mutuelle"
                                    isInModal={isInModal}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="hidden lg:block lg:col-span-4" />
                </div>
                <div className={clsx('mt-6 flex px-4 lg:px-0 justify-end space-x-2', { ['flex-col']: isInModal })}>
                    {!isInModal && (
                        <Link
                            href={MENU.patients.link}
                            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                        >
                            Annuler
                        </Link>
                    )}

                    <Button type="submit">{isUpdateForm ? 'Modifier le patient' : 'Ajouter le patient'}</Button>
                </div>
            </form>
        </Form>
    )
}
