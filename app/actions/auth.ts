'use server'

import { z } from 'zod'
import { passwordPattern } from '@/app/utils/patterns'
import baraApi from '@/app/utils/api'
import { redirect } from 'next/navigation'
import { AxiosError } from 'axios'

const SignUpFormSchema = z.object({
    firstname: z.string(),
    email: z.string().email(),
    password: z.string().regex(passwordPattern, {
        message: 'Le mot de passe doit contenir au moins 8 caractères contenant 1 majuscule, 1 minuscule et 1 chiffre.',
    }),
    confirmPassword: z.string(),
})

const Login = SignUpFormSchema.omit({ firstname: true, confirmPassword: true })

// This is temporary until @types/react-dom is updated
export type State = {
    errors?: {
        firstname?: string[]
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
    }
    message?: string | null
}

export async function signUp(prevState: State, formData: FormData) {
    const validatedFields = SignUpFormSchema.safeParse({
        firstname: formData.get('firstname'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Tous les champs sont obligatoires.',
        }
    }

    const { password, confirmPassword } = validatedFields.data

    if (password !== confirmPassword) {
        return {
            message: 'Les mots de passe sont différents! Veuillez vérifier et réessayer.',
        }
    }

    try {
        await baraApi.post('physio/sign-up', validatedFields.data)
    } catch (e) {
        if (e instanceof AxiosError) {
            return {
                message: `Erreur : ${e.response?.data.message}`,
            }
        }

        return {
            message: `Erreur : ${e}`,
        }
    }

    redirect('/dashboard')
}
