import { useEffect } from 'react'
import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom'

const useSaveBankAccount = ({ campaignId, userId }) => {
  const { data, loading: loadingSaveBankAccount, fetch } = useFetch()
  const navigate = useNavigate()

  const saveBankAccount = (accountSelected) => {
    if (campaignId) {
      updateCampaignBankAccount(accountSelected)
    } else if (userId) {
      //Add user bank account
    }
  }

  const updateCampaignBankAccount = (accountSelected) => {
    let endpoint = `/campaigns/${campaignId}`

    const options = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(accountSelected),
    }

    fetch(endpoint, options)
  }

  useEffect(() => {
    if (data) {
      if (campaignId) navigate(`/campaign/${campaignId}`)
    }
  }, [campaignId, data, navigate])

  return { saveBankAccount, loadingSaveBankAccount }
}

export default useSaveBankAccount
