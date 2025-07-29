import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl'
import { InfoMessage } from '../shared/Messages'
import { useContext, useEffect, useState } from 'react'
import { Button, ButtonLink } from '../shared/Buttons'
import DonationModal from './DonationModal'
import LoginModal from './LoginModal'
import AuthContext from '../../context/AuthContext'
import useDonate from '../../hooks/useDonate'
import useOAuth from '../../hooks/useOAuth'

function DoDonation({
  campaignId,
  suggestions,
  minimumDonation,
  hasBankAccount,
  isOwner,
  donationsDisabled,
}) {
  const [amount, setAmount] = useState('')
  const [inputAmount, setInputAmount] = useState('')
  const intl = useIntl()
  const [modalDonationOpen, setModalDonationOpen] = useState(false)
  const [modalLoginOpen, setModalLoginOpen] = useState(false)
  const { isAuthenticated, whoAmI } = useContext(AuthContext)
  const { data, donate } = useDonate(campaignId)

  const {
    oAuthAutenticate,
    setAmount: setOauthAmount,
    setBankAccount: setOauthBankAccount,
  } = useOAuth({
    campaignId: campaignId,
    userId: whoAmI?.id,
    isDonation: true,
  })

  const handleFastDonation = (amount) => {
    if (!isAuthenticated()) {
      setModalLoginOpen(true)
    } else {
      setAmount(amount)
      setModalDonationOpen(true)
    }
  }

  const handleInputAmount = () => {
    if (!isAuthenticated()) {
      setModalLoginOpen(true)
    } else {
      setAmount(inputAmount)
      setModalDonationOpen(true)
    }
  }

  useEffect(() => {
    setOauthAmount(amount)
  }, [amount, setOauthAmount])

  useEffect(() => {
    if (data?.notAllowed) {
      oAuthAutenticate()
    } else if (data?.redirection) {
      window.location.href = data.redirection
    }
  }, [data, oAuthAutenticate])

  return (
    <>
      <div className="flex flex-col mx-2 p-3 border border-gray-200 rounded-sm">
        <InfoMessage id="do_donation" className="text-xl font-semibold" />
        <FormattedMessage id="suggestions" className="mt-2" />
        <div className="flex w-full justify-center">
          <div className="flex flex-wrap w-full justify-around my-5">
            {suggestions?.map((suggestion, index) => (
              <button
                disabled={!hasBankAccount || donationsDisabled || isOwner}
                key={index}
                onClick={() => handleFastDonation(suggestion)}
                className="rounded-full w-19 h-19 aspect-square bg-emerald-400 hover:bg-emerald-600 cursor-pointer shadow-sm mx-2 mt-2 flex justify-center items-center
                disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-gray-600 disabled:cursor-default
                disabled:hover:text-gray-600 disabled:border-gray-600"
              >
                <span className="text-white font-semibold">
                  <FormattedNumber
                    value={suggestion}
                    style="currency"
                    currency="EUR"
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="minimumDonation" className="py-5">
            <FormattedMessage
              id="another_amount"
              values={{
                minimum: minimumDonation > 0 && (
                  <FormattedMessage
                    id="minimum_amount"
                    values={{
                      amount: (
                        <FormattedNumber
                          value={minimumDonation}
                          style="currency"
                          currency="EUR"
                        />
                      ),
                    }}
                  />
                ),
              }}
              className="mt-2"
            />
          </label>
          <div className="flex flex-wrap">
            <input
              disabled={!hasBankAccount || donationsDisabled || isOwner}
              type="number"
              id="minimumDonation"
              value={inputAmount}
              placeholder={intl.formatMessage({ id: 'insert_in_euros' })}
              onChange={(e) => setInputAmount(e.target.value)}
              className="px-4 py-3 mr-2 mt-2 block text-sm shadow-sm rounded-lg text-info border input-primary focus:outline-none hover:border-emerald-400
              disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-gray-600 disabled:cursor-default
              disabled:hover:text-gray-600 disabled:border-gray-600"
            />
            <Button
              disabled={
                !hasBankAccount || donationsDisabled || isOwner || !inputAmount
              }
              onClick={() => handleInputAmount(amount)}
              type="button"
              className="ml-2 mt-2"
            >
              <FormattedMessage id="donate" />
            </Button>
          </div>
          {isOwner && !hasBankAccount && !donationsDisabled && (
            <div>
              <ButtonLink
                link={`/openbanking/bank-selection?campaign=${campaignId}`}
                className="mt-2 w-full"
              >
                <FormattedMessage id="enable_donations" />
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
      <DonationModal
        modalOpen={modalDonationOpen}
        setModalOpen={setModalDonationOpen}
        amount={amount}
        acceptDonation={donate}
        setBankAccount={setOauthBankAccount}
      />
      <LoginModal
        modalOpen={modalLoginOpen}
        setModalOpen={setModalLoginOpen}
        campaignId={campaignId}
      />
    </>
  )
}

export default DoDonation
