import { useEffect, useRef, useState } from 'react'
import useAspsps from './useAspsps'
import useFetch from './useFetch'

const useBankAccountSelection = (aspspParam, { campaignId, userId }) => {
  const [bankAccounts, setBankAccounts] = useState()
  const [accountSelected, setAccountSelected] = useState()
  const { data, loading: loadingBankAccounts, fetch } = useFetch()
  const hasFetched = useRef(false)

  const {
    aspsps,
    loading: loadignAspsps,
    aspspSelected,
    setAspspSelected,
  } = useAspsps(aspspParam)

  useEffect(() => {
    if (aspspSelected && !hasFetched.current) {
      let endpoint = `/providers/${aspspSelected.provider}/${aspspSelected.code}/accounts`
      endpoint = campaignId ? `${endpoint}?campaign=${campaignId}` : endpoint

      const options = {
        method: 'GET',
        credentials: 'include',
      }

      fetch(endpoint, options)
      hasFetched.current = true
    }
  }, [aspspSelected, campaignId, fetch])

  useEffect(() => {
    if (data) {
      setBankAccounts(data)
    }
  }, [data])

  const clearBankAccounts = () => {
    setAccountSelected(null)
    setBankAccounts(null)
    hasFetched.current = false
  }

  return {
    aspsps,
    loadignAspsps,
    aspspSelected,
    setAspspSelected,
    bankAccounts,
    loadingBankAccounts,
    clearBankAccounts,
    accountSelected,
    setAccountSelected,
  }
}

export default useBankAccountSelection
