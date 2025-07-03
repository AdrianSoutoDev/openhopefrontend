import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl'
import { InfoMessage } from '../shared/Messages'
import { useState } from 'react'
import { Button, ButtonLink } from '../shared/Buttons'
import DonationModal from './DonationModal'

function DoDonation({
  campaignId,
  suggestions,
  minimumDonation,
  hasBankAccount,
  isOwner,
  donationsDisabled,
}) {
  const [amount, setAmount] = useState('')
  const intl = useIntl()
  const [modalOpen, setModalOpen] = useState(false)

  const handleDonation = (amount) => {
    if (amount) {
      console.log('donate: ', amount)
      setModalOpen(true)
    }
  }

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
                onClick={() => handleDonation(suggestion)}
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
              value={amount}
              placeholder={intl.formatMessage({ id: 'insert_in_euros' })}
              onChange={(e) => setAmount(e.target.value)}
              className="px-4 py-3 mr-2 mt-2 block text-sm shadow-sm rounded-lg text-info border input-primary focus:outline-none hover:border-emerald-400
              disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-gray-600 disabled:cursor-default
              disabled:hover:text-gray-600 disabled:border-gray-600"
            />
            <Button
              disabled={
                !hasBankAccount || donationsDisabled || isOwner || !amount
              }
              onClick={() => handleDonation(amount)}
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
      <DonationModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  )
}

export default DoDonation
