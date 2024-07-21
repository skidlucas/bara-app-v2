import axios from 'axios'

const getClerkAccessTokenFromCookies = () => {
    const clerkCookieName = '__session'
    if (typeof window !== 'undefined') {
        // client components
        const value = `; ${document?.cookie}`
        const parts = value.split(`; ${clerkCookieName}=`)
        if (parts.length === 2) return parts.pop()?.split(';').shift()
    }
}

const baraClientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

baraClientApi.interceptors.request.use((cfg) => {
    const accessToken = getClerkAccessTokenFromCookies()
    if (accessToken) {
        cfg.headers.Authorization = `Bearer ${accessToken}`
    }
    return cfg
})

export default baraClientApi
