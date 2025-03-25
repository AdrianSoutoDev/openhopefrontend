import { getToken } from './tokenService.js'

const baseURL =  import.meta.env.VITE_API_URL;

const apiRequest = async (endpoint, options = {}) => {
    const token = getToken()
    const headers = {
        ...options.headers,
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const config = {
        ...options,
        headers,
    }

    return await fetch(`${baseURL}${endpoint}`, config)
};

export default apiRequest