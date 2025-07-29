import { useEffect, useState } from 'react'
import useFetch from './useFetch'

const useOAuth = ({ campaignId, userId, isDonation }) => {
  const { data, loading: loadingOAuth, fetch } = useFetch()
  const [amount, setAmount] = useState()
  const [bankAccount, setBankAccount] = useState()

  const oAuthAutenticate = (aspspSelected) => {
    const aspsp = aspspSelected ? aspspSelected.code : bankAccount?.aspsp?.code

    const provider = aspspSelected
      ? aspspSelected.provider
      : bankAccount?.aspsp?.provider

    let endpoint = `/providers/${provider}/${aspsp}/oauth`

    if (isDonation) {
      endpoint = `${endpoint}?campaign=${campaignId}&isDonation=true&amount=${amount}&bankAccount=${bankAccount?.id}`
    } else if (campaignId) {
      endpoint = `${endpoint}?campaign=${campaignId}`
    } else {
      endpoint = `${endpoint}?user=${userId}`
    }

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

  return {
    oAuthAutenticate,
    loadingOAuth,
    setAmount,
    setBankAccount,
    bankAccount,
  }
}

export default useOAuth
