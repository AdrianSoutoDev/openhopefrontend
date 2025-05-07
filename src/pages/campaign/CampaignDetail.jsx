import { Link, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useEffect, useRef, useState } from 'react'
import Spinner from '../../components/shared/Spinner'
import { getImgFromServer } from '../../utils/utils'
import { FormattedDate, FormattedNumber, FormattedMessage } from 'react-intl'
import CampaignSideBar from '../../components/campaign/sideBar'
import CampaignDonations from '../../components/campaign/donations'
import { InfoMessage } from '../../components/shared/Messages'

function CampaignDetail() {
  const { id } = useParams()
  const { data, loading, fetch } = useFetch()
  const hasFetched = useRef(false)
  const [campaign, setCampaign] = useState({})

  //TODO Añadir sugerencias de donaciones;
  const doDonationData = {
    suggestions: [0.5, 5, 25],
  }

  function RenderHTML({ htmlString }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  }

  useEffect(() => {
    if (!hasFetched.current) {
      const endpoint = `/campaigns/${id}`
      const options = { method: 'GET' }
      fetch(endpoint, options)
      hasFetched.current = true
    }
  }, [fetch, id])

  useEffect(() => {
    if (data) {
      setCampaign(data)
    }
  }, [data])

  return (
    <>
      {loading ? (
        <div className="h-128 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <div className="md:w-10/12">
            <div className="mt-12 px-3 flex justify-center md:justify-start overflow-hidden">
              <div className="md:w-10/12 flex flex-col text-center md:text-start">
                <h1 className="block font-semibold text-6xl text-gray-900">
                  {campaign.name}
                </h1>
                <h2 className="mt-3 block font-semibold text-4xl text-gray-700">
                  <Link to={`/organization/${campaign.organization?.id}`}>
                    {campaign.organization?.name}
                  </Link>
                </h2>
              </div>
            </div>

            <div className="flex flex-col md:flex-row mt-5">
              <div className="flex flex-col md:w-8/12">
                <div className="mx-3 min-w-72 max-w-full flex justify-center border border-gray-200 rounded-sm">
                  <img
                    src={
                      campaign.image
                        ? getImgFromServer(campaign.image)
                        : '/img/default-image.jpg'
                    }
                    className="rounded-sm"
                  />
                </div>
                <div>
                  <div className="mt-2 text-lg font-medium text-center md:text-start md:float-left md:pl-3">
                    {campaign.dateLimit && (
                      <FormattedMessage
                        id="ends_on"
                        values={{
                          date: (
                            <FormattedDate
                              value={new Date(campaign.dateLimit)}
                              year="numeric"
                              month="2-digit"
                              day="2-digit"
                            />
                          ),
                        }}
                      />
                    )}
                  </div>
                  <div className="mt-2 text-lg font-medium flex flex-col text-center md:text-right md:float-right md:pr-3">
                    {campaign.economicTarget && (
                      <>
                        <div>
                          <FormattedMessage
                            id="target"
                            values={{
                              target: (
                                <FormattedNumber
                                  value={campaign.economicTarget}
                                  style="currency"
                                  currency="EUR"
                                />
                              ),
                            }}
                          />
                        </div>
                        <div className="text-sm">
                          {Number(campaign.percentageCollected) > 0 && (
                            <FormattedMessage
                              id="has_been_collected_of_target"
                              values={{
                                percentage: (
                                  <FormattedNumber
                                    value={campaign.percentageCollected}
                                    style="percent"
                                  />
                                ),
                              }}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  {campaign.description && (
                    <div className="p-3">
                      <RenderHTML htmlString={campaign.description} />
                    </div>
                  )}
                </div>

                {Number(campaign.amountCollected) > 0 ? (
                  <CampaignDonations
                    amountCollected={campaign.amountCollected}
                    className="hidden md:block mx-3"
                  />
                ) : (
                  <InfoMessage
                    id="be_the_first"
                    className="text-2xl font-semibold w-full text-center my-5 hidden md:block"
                  />
                )}
              </div>

              <CampaignSideBar
                doDonationData={doDonationData}
                minimumDonation={campaign.minimumDonation}
              />
            </div>

            {Number(campaign.amountCollected) > 0 ? (
              <CampaignDonations
                amountCollected={campaign.amountCollected}
                className="md:hidden"
              />
            ) : (
              <div className="w-full flex justify-center">
                <InfoMessage
                  id="be_the_first"
                  className="text-xl font-semibold w-full text-center my-5 md:hidden"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default CampaignDetail
