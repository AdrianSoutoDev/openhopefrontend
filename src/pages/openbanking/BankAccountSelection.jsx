import { useSearchParams } from 'react-router-dom'
import SimpleSelector from '../../components/shared/SimpleSelector'
import { Button } from '../../components/shared/Buttons'
import { FormattedMessage } from 'react-intl'
import Spinner from '../../components/shared/Spinner'
import useBankAccountSelection from '../../hooks/useBankAccountSelection'
import useSaveBankAccount from '../../hooks/useSaveBankAccount'
import useOAuth from '../../hooks/useOAuth'
import { InfoMessage } from '../../components/shared/Messages'
import PageTitle from '../../components/shared/PageTitle'
import useCampaign from '../../hooks/useCampaign'
import Icons from '../../components/shared/Icons'

function BankAccountSelection() {
  const [searchParams] = useSearchParams()
  const campaignId = searchParams.get('campaign')
  const userId = searchParams.get('user')
  const aspspParam = searchParams.get('aspsp')

  const { campaign, loading: loadingCampaign } = useCampaign(campaignId)

  const { oAuthAutenticate, loadingOAuth } = useOAuth({
    campaignId: campaignId,
    userId: userId,
  })

  const { saveBankAccount, loadingSaveBankAccount } = useSaveBankAccount({
    campaignId: campaignId,
    userId: userId,
  })

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
  } = useBankAccountSelection(aspspParam, {
    campaignId: campaignId,
    userId: userId,
  })

  const handleAcceptConsent = () => {
    if (bankAccounts.redirection)
      window.location.href = bankAccounts.redirection
  }

  const handleAspspSelectedChange = (aspsp) => {
    clearBankAccounts()
    setAspspSelected(aspsp)
  }

  const handleSaveAccount = () => {
    saveBankAccount(accountSelected, aspspSelected)
  }

  const handleAccess = () => {
    oAuthAutenticate(aspspSelected)
  }

  return (
    <>
      {loadignAspsps ? (
        <div className="h-128 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="p-4 max-w-96 md:max-w-3xl">
            <PageTitle
              title={campaignId ? campaign?.name : ''}
              className="mb-[5rem]"
            />

            <div className="text-center mb-2 flex flex-col w-full items-center justify-center">
              <Icons.Info className="mr-2 text-emerald-600 " />

              {!aspspSelected && (
                <InfoMessage
                  id={campaignId ? 'select_bank_entity_campaign' : ''}
                />
              )}

              {aspspSelected && bankAccounts?.notAllowed && (
                <InfoMessage
                  id={campaignId ? 'authenticate_bank_entity' : ''}
                />
              )}

              {aspspSelected && bankAccounts?.redirection && (
                <InfoMessage
                  id={campaignId ? 'accept_consent_bank_entity' : ''}
                />
              )}

              {!accountSelected &&
                bankAccounts?.accounts &&
                !bankAccounts?.notAllowed &&
                !bankAccounts?.redirection && (
                  <InfoMessage id="select_bank_account" />
                )}

              {accountSelected && (
                <>
                  <InfoMessage
                    id={campaignId ? 'save_bank_account_campaign' : ''}
                  />
                  <span className="mt-1 text-info font-bold">
                    {accountSelected?.name}
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center mt-[3rem]">
              <div className="w-full md:mr-1">
                <label className="text-info">
                  <FormattedMessage id="bank_entity_label" />
                </label>
                <SimpleSelector
                  className={!aspspSelected ? 'shadow-emerald-400' : ''}
                  emptyText={<FormattedMessage id="selection_bank_entity" />}
                  sourceItems={aspsps}
                  setItemSelected={handleAspspSelectedChange}
                  defaultItem={aspspSelected}
                />
              </div>
              <div className="w-full md:ml-1">
                <label className="text-info">
                  <FormattedMessage id="bank_account_label" />
                </label>
                <SimpleSelector
                  className={
                    !accountSelected &&
                    bankAccounts?.accounts &&
                    !bankAccounts?.notAllowed &&
                    !bankAccounts?.redirection
                      ? 'shadow-emerald-400'
                      : ''
                  }
                  emptyText={<FormattedMessage id="selection_bank_account" />}
                  disabled={
                    !bankAccounts ||
                    (bankAccounts &&
                      (bankAccounts.notAllowed || bankAccounts.redirection))
                  }
                  sourceItems={bankAccounts?.accounts}
                  setItemSelected={setAccountSelected}
                />
              </div>
            </div>

            <div className="md:flex mt-3">
              {aspspSelected && bankAccounts?.notAllowed && (
                <Button
                  type="button"
                  onClick={handleAccess}
                  disabled={
                    !aspspSelected || (bankAccounts && !bankAccounts.notAllowed)
                  }
                >
                  <FormattedMessage id="access" />
                </Button>
              )}

              {aspspSelected && bankAccounts?.redirection && (
                <Button
                  type="button"
                  onClick={handleAcceptConsent}
                  disabled={!(bankAccounts && bankAccounts.redirection)}
                >
                  <FormattedMessage id="accept_consents" />
                </Button>
              )}

              {aspspSelected &&
                bankAccounts?.accounts &&
                !bankAccounts?.notAllowed &&
                !bankAccounts.redirection && (
                  <div className="w-full flex md:justify-end">
                    <Button
                      type="button"
                      onClick={handleSaveAccount}
                      disabled={!accountSelected}
                    >
                      <FormattedMessage id="save" />
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BankAccountSelection
