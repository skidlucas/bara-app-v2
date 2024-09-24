import axios from 'axios'
import { cookies } from 'next/headers'

const getClerkAccessTokenFromCookies = () => {
    const clerkCookieName = '__session'
    return cookies().get(clerkCookieName)?.value
}

const baraServerApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

baraServerApi.interceptors.request.use((cfg) => {
    const accessToken = getClerkAccessTokenFromCookies()
    if (accessToken) {
        cfg.headers.Authorization = `Bearer ${accessToken}`
    }
    return cfg
})

export default baraServerApi
