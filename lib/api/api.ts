import axios from 'axios'
import { getAuthToken } from '../actions/auth.action'

const baraApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

baraApi.interceptors.request.use(async (cfg) => {
    const accessToken = await getAuthToken()

    if (accessToken) {
        cfg.headers.Authorization = `Bearer ${accessToken}`
    }
    return cfg
})

export default baraApi
