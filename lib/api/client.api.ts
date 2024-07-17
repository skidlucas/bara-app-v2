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
