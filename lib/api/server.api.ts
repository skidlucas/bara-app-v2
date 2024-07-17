import axios from 'axios'
import { cookies } from 'next/headers'

const getClerkAccessTokenFromCookies = () => {
    const clerkCookieName = '__session'
    return cookies().get(clerkCookieName)?.value
}

const baraApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

baraApi.interceptors.request.use((cfg) => {
    const accessToken = getClerkAccessTokenFromCookies()
    if (accessToken) {
        cfg.headers.Authorization = `Bearer ${accessToken}`
    }
    return cfg
})

// baraApi.interceptors.response.use(
//     (response) => {
//         // do nothing
//         return response
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             const state = accessTokenStore.getState()
//             const { accessToken } = state
//             if (accessToken) {
//                 isTokenValid(accessToken)
//             }
//         }
//         return Promise.reject(error)
//     },
// )

export default baraApi
