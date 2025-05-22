import { useEffect, useRef, useState } from 'react'
import useFetch from './useFetch'

const useCampaign = (id) => {
  const { data, loading, fetch } = useFetch()
  const hasFetched = useRef(false)
  const [campaign, setCampaign] = useState({})

  useEffect(() => {
    if (!hasFetched.current && id) {
      const endpoint = `/campaigns/${id}`
      const options = { method: 'GET' }
      fetch(endpoint, options)
      hasFetched.current = true
    }
  }, [fetch, id])

  useEffect(() => {
    if (data) {
      setCampaign(data)
    }
  }, [data])

  useEffect(() => {
    hasFetched.current = false
  }, [id])

  return { campaign, loading }
}

export default useCampaign
