import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import baraApi from '@/app/lib/api'
import { AxiosError, AxiosResponse } from 'axios'

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(8) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    let res: AxiosResponse
                    try {
                        res = await baraApi.post('auth/login', { email, password })

                        if (!res.data) {
                            return null
                        }

                        return res.data
                    } catch (e) {
                        if (e instanceof AxiosError) {
                            console.log(`Erreur : ${e.response?.data.message}`)
                            return null
                        }
                    }
                }

                console.log('Erreur dans le formulaire de connexion')
                return null
            },
        }),
    ],
    callbacks: {
        // todo is this necessary?
        jwt: async ({ token, account }) => {
            // Add access_token to jwt token
            if (account?.access_token) {
                token.accessToken = account.access_token
            }
            return token
        },
        session: async ({ session, token }) => {
            // Add access_token to session
            if (token?.accessToken) {
                session.accessToken = token.accessToken
            }
            return session
        },
    },
})
