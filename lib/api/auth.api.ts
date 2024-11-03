import { post } from './api'

export const signUp = async () => {
    return await post(`/auth/sign-up`, {})
}
