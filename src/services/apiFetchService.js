import { getToken } from './tokenService.js'

const baseURL = import.meta.env.VITE_API_URL

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
}

export const handleOkResponse = (response, onSuccess) => {
  if (!response.ok) {
    return false
  }

  if (!onSuccess) {
    return true
  }

  if (response.status === 204) {
    onSuccess()
    return true
  }

  if (isJson(response)) {
    response
      .clone()
      .json()
      .then((payload) => onSuccess(payload))
  }

  return true
}

export const handle4xxResponse = (response, onError, unauthorizedCallback) => {
  if (response.status < 400 || response.status >= 500) {
    return false
  }

  if (response.status === 401) {
    if (unauthorizedCallback && isJson(response)) {
      response
        .clone()
        .json()
        .then((payload) => {
          unauthorizedCallback(payload)
        })
    } else if (unauthorizedCallback) {
      unauthorizedCallback()
    }
    return true
  }

  if (isJson(response) && onError) {
    response
      .clone()
      .json()
      .then((payload) => {
        onError(payload)
      })
  }

  return true
}

export const handleError = (response, onError) => {
  if (isJson(response) && onError) {
    response
      .clone()
      .json()
      .then((payload) => {
        onError(payload)
      })
  }
}

export const isJson = (response) => {
  const contentType = response.headers.get('content-type')
  return contentType && contentType.indexOf('application/json') !== -1
}

export default apiRequest
