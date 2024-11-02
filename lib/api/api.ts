import { getAuthToken } from '../actions/auth.action'

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const completeUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`
    const accessToken = await getAuthToken()

    const headers = new Headers(options.headers)
    if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
    }

    if (options.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json')
    }

    const fetchOptions: RequestInit = {
        ...options,
        headers,
    }

    const res = await fetch(completeUrl, fetchOptions)
    if (!res.ok) {
        // todo handle error here !
        throw new Error(`HTTP error! Status: ${res.status}`)
    }

    return res.json()
}

export async function get(url: string) {
    return await fetchWithAuth(url)
}

export async function post(url: string, body: any) {
    return await fetchWithAuth(url, { method: 'POST', body: JSON.stringify(body) })
}

export async function patch(url: string, body: any) {
    return await fetchWithAuth(url, { method: 'PATCH', body: JSON.stringify(body) })
}

export async function del(url: string) {
    return await fetchWithAuth(url, { method: 'DELETE' })
}
