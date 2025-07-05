import { useCallback, useEffect } from 'react'
import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom'

const useRegister = ({ redirectUrl }) => {
  const { data, loading, fetch } = useFetch()
  const navigate = useNavigate()

  const onSuccess = useCallback(() => {
    if (redirectUrl) {
      navigate('/login', {
        state: { registered: true, redirecturl: redirectUrl },
      })
    } else {
      navigate('/login', { state: { registered: true } })
    }
  }, [navigate, redirectUrl])

  const register = (
    email,
    password,
    name,
    description,
    categories,
    file,
    typeAccount,
    topics,
  ) => {
    const isUserRegister = typeAccount === 'user'

    const endpoint = isUserRegister ? '/users' : '/organizations'

    const formData = new FormData()

    if (!isUserRegister) {
      formData.append('email', email)
      formData.append('password', password)
      formData.append('name', name)
      formData.append('description', description)
      formData.append('categories', categories.join(','))
      formData.append('topics', topics.join(','))
      formData.append('file', file)
    }

    const body = isUserRegister ? JSON.stringify({ email, password }) : formData

    const headers = isUserRegister ? { 'Content-Type': 'application/json' } : {}

    const options = {
      method: 'POST',
      headers: headers,
      body: body,
    }

    fetch(endpoint, options)
  }

  useEffect(() => {
    if (data) onSuccess(data)
  }, [data, onSuccess])

  return { register, data, loading }
}

export default useRegister
