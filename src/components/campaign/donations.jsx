import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl'
import { InfoMessage } from '../shared/Messages'
import { useCallback, useEffect, useMemo } from 'react'
import useDataTableData from '../../hooks/useDataTableData'
import DataTable from '../shared/DataTable'

function CampaignDonations({
  className,
  amountCollected,
  campaignId,
  donationTrigger,
}) {
  const donationsHeaders = [
    <FormattedMessage id="table_headers_date_donation" />,
    <FormattedMessage id="table_headers_donation_amount" />,
  ]

  const donationsMapper = useCallback((objects) => {
    const mappedObjects = []
    objects.forEach((obj) => {
      const values = [
        <FormattedDate
          value={new Date(obj.date)}
          year="numeric"
          month="2-digit"
          day="2-digit"
        />,
        <FormattedNumber value={obj.amount} style="currency" currency="EUR" />,
      ]

      mappedObjects.push({
        id: obj.id,
        values: values,
      })
    })

    return mappedObjects
  }, [])

  const donationsSource = useMemo(
    () => ({
      endpoint: `/campaigns/${campaignId}/donations`,
      options: { method: 'GET' },
    }),
    [campaignId],
  )

  const {
    items: donations,
    pageInfo: donationsPageInfo,
    nextPage: donationsNextPage,
    previousPage: donationsPreviousPage,
    refresh,
  } = useDataTableData(donationsSource, donationsMapper)

  useEffect(() => {
    refresh()
  }, [donationTrigger, refresh])

  return (
    <>
      <div className={`text-2xl text-info font-semibold mt-5 ${className}`}>
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

        <div>
          <DataTable
            className={'mt-5'}
            items={donations}
            tableHeaders={donationsHeaders}
            nextPage={donationsNextPage}
            previousPage={donationsPreviousPage}
            pageInfo={donationsPageInfo}
          />
        </div>
      </div>
    </>
  )
}

export default CampaignDonations
