import { FormattedNumber } from 'react-intl'
import { InfoMessage } from '../shared/Messages'

function CampaignDonations({ className, amountCollected }) {
  return (
    <>
      <div className={`text-2xl text-info font-semibold ${className}`}>
        <p>
          {'¡'}
          <InfoMessage
            id="we_have_already_raised"
            values={{
              amount: (
                <FormattedNumber
                  value={amountCollected}
                  style="currency"
                  currency="EUR"
                />
              ),
            }}
          />
          {'!'}
        </p>

        {/*TODO tabla de donations */}
      </div>
    </>
  )
}

export default CampaignDonations
