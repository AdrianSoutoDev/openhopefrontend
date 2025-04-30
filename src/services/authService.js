import apiRequest from "./apiFetchService";

export const sendLogout = async () => {
    const endpoint = '/accounts/logout'
    const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }

    apiRequest(endpoint, options)
};

export const validateToken = async () => {
    const endpoint = '/accounts/validate'
    const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }

    return await apiRequest(endpoint, options)
};
