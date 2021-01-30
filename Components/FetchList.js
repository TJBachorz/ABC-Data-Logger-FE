const baseURL = "https://abc-dl-backend.herokuapp.com"
// const baseURL = "http://localhost:8000"

export const authFetch = (path, method, token, rawBody=null) => {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    if (rawBody !== null) {
        const body = JSON.stringify(rawBody)
        return fetch(`${baseURL}/${path}`, { method, headers, body })
            .then(response => response.json())
    } else {
        return fetch(`${baseURL}/${path}`, { method, headers })
            .then(response => response.json())
    }
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

