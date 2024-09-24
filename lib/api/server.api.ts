import axios from 'axios'
import { cookies } from 'next/headers'
import { auth } from '@clerk/nextjs/server'

const getClerkAccessTokenFromCookies = () => {
    const clerkCookieName = '__session'
    return cookies().get(clerkCookieName)?.value ?? null
}

const baraServerApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

baraServerApi.interceptors.request.use(async (cfg) => {
    let accessToken = getClerkAccessTokenFromCookies()

    // if token is not yet in cookies, get it from Clerk
    if (!accessToken) {
        const { getToken } = auth()
        accessToken = await getToken()
    }

    if (accessToken) {
        cfg.headers.Authorization = `Bearer ${accessToken}`
    }
    return cfg
})

export default baraServerApi
