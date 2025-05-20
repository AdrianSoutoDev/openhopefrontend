import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import SimpleSelector from '../../components/shared/SimpleSelector'
import { Button } from '../../components/shared/Buttons'
import { FormattedMessage } from 'react-intl'
import Spinner from '../../components/shared/Spinner'
import useBankAccountSelection from '../../hooks/useBankAccountSelection'
import useSaveBankAccount from '../../hooks/useSaveBankAccount'

function BankAccountSelection() {
  const [searchParams] = useSearchParams()
  const campaignId = searchParams.get('campaign')
  const aspspParam = searchParams.get('aspsp')

  const { data: authData, fetch: authfetch } = useFetch()
  const { saveBankAccount } = useSaveBankAccount({ campaignId: campaignId })

  const {
    aspsps,
    loadignAspsps,
    aspspSelected,
    setAspspSelected,
    bankAccounts,
    loadingBankAccounts,
    clearBankAccounts,
    accountSelected,
    setAccountSelected,
  } = useBankAccountSelection(aspspParam, { campaignId: campaignId })

  useEffect(() => {
    if (authData) {
      window.location.href = authData.uri
    }
  }, [authData])

  const handleAccess = () => {
    let endpoint = `/providers/${aspspSelected.provider}/${aspspSelected.code}/oauth`
    if (campaignId) {
      endpoint = `${endpoint}?campaign=${campaignId}`
    }

    const options = {
      method: 'GET',
    }

    authfetch(endpoint, options)
  }

  const handleAcceptConsent = () => {
    if (bankAccounts.redirection)
      window.location.href = bankAccounts.redirection
  }

  const handleAspspSelectedChange = (aspsp) => {
    clearBankAccounts()
    setAspspSelected(aspsp)
  }

  const handleSaveAccount = () => {
    saveBankAccount(accountSelected)
  }

  return (
    <>
      {loadignAspsps ? (
        <div className="h-128 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="p-4 max-w-96 md:max-w-2xl">
            <div className="flex flex-col justify-center items-center">
              <SimpleSelector
                sourceItems={aspsps}
                setItemSelected={handleAspspSelectedChange}
                defaultItem={aspspSelected}
              />
            </div>

            <Button
              type="button"
              onClick={handleAccess}
              disabled={
                !aspspSelected || (bankAccounts && !bankAccounts.notAllowed)
              }
            >
              <FormattedMessage id="access" />
            </Button>

            <div className="flex flex-col justify-center items-center">
              <SimpleSelector
                disabled={
                  !bankAccounts ||
                  (bankAccounts &&
                    (bankAccounts.notAllowed || bankAccounts.redirection))
                }
                sourceItems={bankAccounts?.accounts}
                setItemSelected={setAccountSelected}
              />
            </div>

            <Button
              type="button"
              onClick={handleSaveAccount}
              disabled={!accountSelected}
            >
              <FormattedMessage id="save" />
            </Button>

            <Button
              type="button"
              onClick={handleAcceptConsent}
              disabled={!(bankAccounts && bankAccounts.redirection)}
            >
              <FormattedMessage id="accept_consents" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default BankAccountSelection
