import { baseURL } from './DateFunctions';

export const authFetch = (path, method, rawBody, token) => {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const body = JSON.stringify(rawBody)
    return fetch(`${baseURL}/${path}`, { method, headers, body })
        .then(response => response.json())
}

export const noAuthFetch = (path, method, rawBody) => {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
    const body = JSON.stringify(rawBody)
    return fetch(`${baseURL}/${path}`, { method, headers, body })
        .then(response => response.json())
}

