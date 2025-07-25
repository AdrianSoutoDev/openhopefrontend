import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import Spinner from '../../components/shared/Spinner'
import { getImgFromServer } from '../../utils/utils'
import { FormattedDate, FormattedNumber, FormattedMessage } from 'react-intl'
import CampaignSideBar from '../../components/campaign/sideBar'
import CampaignDonations from '../../components/campaign/donations'
import { InfoMessage } from '../../components/shared/Messages'
import AuthContext from '../../context/AuthContext'
import useCampaign from '../../hooks/useCampaign'
import ConfirmationDonationModal from '../../components/campaign/ConfirmationDonationModal'
import useFetch from '../../hooks/useFetch'
import useDonate from '../../hooks/useDonate'

function CampaignDetail() {
  const { id } = useParams()
  const { campaign, loading } = useCampaign(id)
  const { isAuthenticated, whoAmI } = useContext(AuthContext)
  const { data: dataDonate, donate } = useDonate(id)
  const [trigger, setTrigger] = useState(0)

  const {
    data: dataConfirmation,
    loading: loadingConfirmation,
    fetch: fetchConfirmation,
  } = useFetch()

  const [confirmationDonateModalOpen, setConfirmationDonateModalOpen] =
    useState(false)

  const hasDonated = useRef(false)
  const hasFetched = useRef(false)

  const [searchParams] = useSearchParams()
  const isDonation = searchParams.get('isDonation')
  const provider = searchParams.get('provider')
  const aspsp = searchParams.get('aspsp')
  const amount = searchParams.get('amount')
  const bankAccount = searchParams.get('bankAccount')

  const status = searchParams.get('status')
  const donation = searchParams.get('donation')

  function RenderHTML({ htmlString }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  }

  useEffect(() => {
    if (isDonation) {
      const bankAccountObj = {
        aspsp: {
          provider: provider,
          code: aspsp,
        },
        id: bankAccount,
      }

      if (!hasDonated.current) {
        donate(amount, bankAccountObj)
        hasDonated.current = true
      }
    }
  }, [amount, aspsp, bankAccount, donate, isDonation, provider])

  useEffect(() => {
    if (dataDonate?.redirection) {
      window.location.href = dataDonate.redirection
    }
  }, [dataDonate])

  useEffect(() => {
    if (status === 'OK' && donation) {
      if (!hasFetched.current) {
        const endpoint = `/donations/payment/callback?status=${status}&donation=${donation}`
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }

        fetchConfirmation(endpoint, options)
        hasFetched.current = true
      }
    }
  }, [donation, fetchConfirmation, status])

  useEffect(() => {
    if (dataConfirmation) {
      setTrigger((prev) => prev + 1)
      setConfirmationDonateModalOpen(true)
    }
  }, [dataConfirmation])

  return (
    <>
      {loading ? (
        <div className="h-128 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
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
                  <div className="my-2 mx-3 p-3 border border-gray-200 rounded-sm">
                    <div className="text-lg font-medium text-center md:text-start md:float-left md:pl-3">
                      {campaign.dateLimit &&
                        (campaign.isOnGoing ? (
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
                        ) : (
                          <FormattedMessage
                            id="ended_on"
                            values={{
                              date: (
                                <FormattedDate
                                  value={new Date(campaign.finalizedDate)}
                                  year="numeric"
                                  month="2-digit"
                                  day="2-digit"
                                />
                              ),
                            }}
                          />
                        ))}
                    </div>
                    <div className="text-lg font-medium flex flex-col text-center md:text-right md:float-right md:pr-3">
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
                      campaignId={campaign.id}
                      className="hidden md:block mx-3"
                      donationTrigger={trigger}
                    />
                  ) : (
                    campaign.hasBankAccount && (
                      <InfoMessage
                        id="be_the_first"
                        className="text-2xl font-semibold w-full text-center my-5 hidden md:block"
                      />
                    )
                  )}
                </div>

                <CampaignSideBar
                  suggestions={campaign.suggestions}
                  minimumDonation={campaign.minimumDonation}
                  categories={campaign.categories}
                  organizationId={campaign.organization?.id}
                  campaignId={campaign.id}
                  hasBankAccount={campaign.hasBankAccount}
                  isOwner={
                    isAuthenticated() &&
                    campaign.organization &&
                    whoAmI?.id === campaign.organization.id
                  }
                  donationsDisabled={!campaign.isOnGoing}
                />
              </div>

              {Number(campaign.amountCollected) > 0 ? (
                <CampaignDonations
                  amountCollected={campaign.amountCollected}
                  campaignId={campaign.id}
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
          <ConfirmationDonationModal
            modalOpen={confirmationDonateModalOpen}
            setModalOpen={setConfirmationDonateModalOpen}
            loading={loadingConfirmation}
            organization={campaign?.organization?.name}
          />
        </>
      )}
    </>
  )
}
export default CampaignDetail
