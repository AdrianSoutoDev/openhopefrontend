import { useCallback, useEffect } from 'react'
import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom'

const useCreateCampaign = () => {
  const { data, loading, fetch } = useFetch()
  const navigate = useNavigate()

  const onSuccess = useCallback(
    (data) => {
      const id = data.id
      navigate(`/openbanking/bank-selection?campaign=${id}`)
    },
    [navigate],
  )

  const create = (
    organizationId,
    name,
    startAt,
    dateLimit,
    economicTarget,
    minimumDonation,
    description,
    categories,
    file,
    topics,
  ) => {
    const endpoint = '/campaigns'

    const formData = new FormData()

    formData.append('organizationId', organizationId)
    formData.append('name', name)
    formData.append('startAt', startAt)
    if (dateLimit) formData.append('dateLimit', dateLimit)
    if (economicTarget) formData.append('economicTarget', economicTarget)
    if (minimumDonation) formData.append('minimumDonation', minimumDonation)
    if (description) formData.append('description', description)
    if (categories) formData.append('categories', categories.join(','))
    formData.append('topics', topics.join(','))

    formData.append('file', file)

    const options = {
      method: 'POST',
      body: formData,
    }

    fetch(endpoint, options)
  }

  useEffect(() => {
    if (data) onSuccess(data)
  }, [data, onSuccess])

  return { create, data, loading }
}

export default useCreateCampaign
