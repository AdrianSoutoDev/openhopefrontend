import { useCallback, useEffect } from 'react'
import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom'

const useUpdateOrganization = (id) => {
  const { data, loading, fetch } = useFetch()
  const navigate = useNavigate()

  const onSuccess = useCallback(() => {
    navigate(`/organization/${id}`)
  }, [navigate, id])

  const update = (name, description, categories, file, topics) => {
    const endpoint = '/organizations'
    const formData = new FormData()

    formData.append('id', id)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('categories', categories.join(','))
    formData.append('file', file)
    formData.append('topics', topics.join(','))

    const body = formData

    const options = {
      method: 'PUT',
      body: body,
    }

    fetch(endpoint, options)
  }

  useEffect(() => {
    if (data) onSuccess(data)
  }, [data, onSuccess])

  return { update, data, loading }
}

export default useUpdateOrganization
