import useFetch from './useFetch'

const useDonate = (campaignId) => {
  const { data, loading, fetch } = useFetch()

  const donate = (amount, bankAccount) => {
    console.log(bankAccount)
    const endpoint = '/providers/donate'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: bankAccount?.aspsp?.provider,
        aspsp: bankAccount?.aspsp?.code,
        campaignId: campaignId,
        bankAccountId: bankAccount?.id,
        amount: amount,
      }),
      credentials: 'include',
    }

    fetch(endpoint, options)
  }

  return { data, loading, donate }
}

export default useDonate
