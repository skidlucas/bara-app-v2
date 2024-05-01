import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/logged-in')
            if (isOnDashboard) {
                return isLoggedIn
                // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // todo
                // return Response.redirect(new URL('/logged-in', nextUrl))
            }
            return true
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
