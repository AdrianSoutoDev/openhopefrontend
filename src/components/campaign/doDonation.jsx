import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl'
import { InfoMessage } from '../shared/Messages'
import { useState } from 'react'
import { Button } from '../shared/Buttons'

function DoDonation({ suggestions, minimumDonation }) {
  const [amount, setAmount] = useState('')
  const intl = useIntl()

  const handleDonation = () => {
    console.log('donate: ', amount)
  }

  const handleFastDonation = (suggestion) => {
    console.log('donate: ', suggestion)
  }

  return (
    <>
      <div className="flex flex-col mx-2 p-3 border border-gray-200 rounded-sm">
        <InfoMessage id="do_donation" className="text-xl font-semibold" />
        <FormattedMessage id="suggestions" className="mt-2" />
        <div className="flex w-full justify-center">
          <div className="flex flex-wrap w-full justify-around my-5">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleFastDonation(suggestion)}
                className="rounded-full w-19 h-19 aspect-square bg-emerald-400 hover:bg-emerald-600 cursor-pointer shadow-sm mx-2 mt-2 flex justify-center items-center"
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
              type="number"
              id="minimumDonation"
              value={amount}
              placeholder={intl.formatMessage({ id: 'insert_in_euros' })}
              onChange={(e) => setAmount(e.target.value)}
              className="px-4 py-3 mr-2 mt-2 block text-sm shadow-sm rounded-lg text-info border input-primary focus:outline-none hover:border-emerald-400"
            />
            <Button
              onClick={handleDonation}
              type="button"
              className="ml-2 mt-2"
            >
              <FormattedMessage id="donate" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoDonation
