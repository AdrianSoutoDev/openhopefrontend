import { useEffect } from 'react'
import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom'

const useSaveBankAccount = ({ campaignId, userId }) => {
  const { data, loading: loadingSaveBankAccount, fetch } = useFetch()
  const navigate = useNavigate()

  const saveBankAccount = (accountSelected, aspspSelected) => {
    if (campaignId) {
      updateCampaignBankAccount(accountSelected, aspspSelected)
    } else if (userId) {
      saveUserBankAccount(accountSelected, aspspSelected)
    }
  }

  const updateCampaignBankAccount = (accountSelected, aspspSelected) => {
    let endpoint = `/campaigns/${campaignId}`

    accountSelected.aspsp = aspspSelected

    const options = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(accountSelected),
    }

    fetch(endpoint, options)
  }

  const saveUserBankAccount = (accountSelected, aspspSelected) => {
    let endpoint = `/users/bank-account`

    accountSelected.aspsp = aspspSelected

    const options = {
      method: 'POST',
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
      if (userId) navigate('/me')
    }
  }, [campaignId, data, navigate, userId])

  return { saveBankAccount, loadingSaveBankAccount }
}

export default useSaveBankAccount
