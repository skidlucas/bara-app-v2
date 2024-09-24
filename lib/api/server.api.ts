import axios from 'axios'
import { cookies } from 'next/headers'

const getClerkAccessTokenFromCookies = () => {
    const clerkCookieName = '__session'
    return cookies().get(clerkCookieName)?.value
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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

// retry automatique en cas de 401 au bout de 1 seconde
baraServerApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            await delay(1000)
            const newAccessToken = getClerkAccessTokenFromCookies()
            if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return baraServerApi(originalRequest)
            }
        }

        return Promise.reject(new Error(error))
    },
)

export default baraServerApi
