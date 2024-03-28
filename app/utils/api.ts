import axios from 'axios'

const baraApi = axios.create({
    baseURL: process.env.API_URL,
})

baraApi.interceptors.request.use((cfg) => {
    // const state = accessTokenStore.getState()
    // const accessToken = state.accessToken && state.accessToken.id
    // cfg.headers!.Authorization = `Bearer ${accessToken}`
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
