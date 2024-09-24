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

    console.log('accessToken from cookie', accessToken)

    if (!accessToken) {
        const { getToken } = auth()
        accessToken = await getToken()
        console.log('accessToken from auth()', accessToken)
    }

    if (accessToken) {
        cfg.headers.Authorization = `Bearer ${accessToken}`
    }
    return cfg
})

export default baraServerApi
