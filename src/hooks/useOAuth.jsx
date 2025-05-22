import { useEffect } from 'react'
import useFetch from './useFetch'

const useOAuth = ({ campaignId, userId }) => {
  const { data, loading: loadingOAuth, fetch } = useFetch()

  const oAuthAutenticate = (aspspSelected) => {
    let endpoint = `/providers/${aspspSelected.provider}/${aspspSelected.code}/oauth`
    endpoint = campaignId ? `${endpoint}?campaign=${campaignId}` : endpoint

    const options = {
      method: 'GET',
    }

    fetch(endpoint, options)
  }

  useEffect(() => {
    if (data) {
      window.location.href = data.uri
    }
  }, [data])

  return { oAuthAutenticate, loadingOAuth }
}

export default useOAuth
