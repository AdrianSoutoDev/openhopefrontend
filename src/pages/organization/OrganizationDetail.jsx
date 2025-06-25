import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Spinner from '../../components/shared/Spinner'
import AuthContext from '../../context/AuthContext'
import { getImgFromServer } from '../../utils/utils'
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'
import { InfoMessage } from '../../components/shared/Messages'
import { ButtonLink } from '../../components/shared/Buttons'
import PageTitle from '../../components/shared/PageTitle'
import useDataTableData from '../../hooks/useDataTableData'
import DataTable from '../../components/shared/DataTable'

function OrganizationDetail() {
  const { id } = useParams()
  const [organization, setOrganization] = useState({})
  const { data, loading, fetch } = useFetch()
  const hasFetched = useRef(false)
  const { isAuthenticated, whoAmI } = useContext(AuthContext)
  const navigate = useNavigate()

  const campaignTableHeaders = [
    <FormattedMessage id="table_headers_name" />,
    <FormattedMessage id="table_headers_start_at" />,
    <FormattedMessage id="table_headers_state" />,
    <FormattedMessage id="table_headers_amount_collected" />,
  ]

  const campaignsMapper = useCallback((objects) => {
    const mappedObjects = []
    objects.forEach((obj) => {
      const values = [
        obj.name,
        <FormattedDate
          value={new Date(obj.startAt)}
          year="numeric"
          month="2-digit"
          day="2-digit"
        />,
        obj.isOnGoing ? (
          <FormattedMessage id="in_course" />
        ) : (
          <FormattedMessage
            id="ended_on"
            values={{
              date: (
                <FormattedDate
                  value={new Date(obj.finalizedDate)}
                  year="numeric"
                  month="2-digit"
                  day="2-digit"
                />
              ),
            }}
          />
        ),
        <FormattedNumber
          value={obj.amountCollected}
          style="currency"
          currency="EUR"
        />,
      ]

      mappedObjects.push({
        id: obj.id,
        values: values,
      })
    })

    return mappedObjects
  }, [])

  const campaignsSource = useMemo(
    () => ({
      endpoint: `/organizations/${id}/campaigns`,
      options: { method: 'GET' },
    }),
    [id],
  )

  const {
    items: campaigns,
    pageInfo: campaignsPageInfo,
    nextPage: nextCampaignsPage,
    previousPage: previousCampaignsPage,
  } = useDataTableData(campaignsSource, campaignsMapper)

  const clickRow = (id) => {
    navigate(`/campaign/${id}`)
  }

  function RenderHTML({ htmlString }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  }

  useEffect(() => {
    if (!hasFetched.current) {
      const endpoint = `/organizations/${id}`
      const options = { method: 'GET' }
      fetch(endpoint, options)
      hasFetched.current = true
    }
  }, [fetch, id])

  useEffect(() => {
    if (data) {
      setOrganization(data)
    }
  }, [data])

  return (
    <>
      {loading ? (
        <div className="h-128 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="mt-12 px-2 flex justify-center overflow-hidden">
          <div className="md:max-w-8/12 flex flex-col justify-center items-center">
            <PageTitle title={organization.name} className="mb-5" />

            {organization.categories && (
              <div className="mt-2 w-full flex justify-evenly text-xs text-primary">
                {organization.categories.map((cat) => (
                  <div key={cat.id}>{cat.name}</div>
                ))}
              </div>
            )}

            {/* mobile */}

            <div className="mt-3 md:hidden">
              <img
                src={
                  organization.image
                    ? getImgFromServer(organization.image)
                    : '/img/default-image.jpg'
                }
              />
            </div>

            {organization.description && (
              <div className="mt-3 p-2 md:hidden">
                <RenderHTML htmlString={organization.description} />
              </div>
            )}

            {/* desktop */}

            <div className="mt-3 hidden md:inline-block">
              <div className="p-5 min-w-72 max-w-128 float-left">
                <img
                  src={
                    organization.image
                      ? getImgFromServer(organization.image)
                      : '/img/default-image.jpg'
                  }
                  className="rounded-sm"
                />
              </div>

              {organization.description && (
                <div className="p-3">
                  <RenderHTML htmlString={organization.description} />
                </div>
              )}
            </div>

            <div className="w-full">
              <h3 className="text-center mt-10 font-semibold text-3xl text-gray-900">
                <InfoMessage id="campaigns" />
              </h3>
            </div>

            {organization?.id && (
              <>
                <DataTable
                  items={campaigns}
                  tableHeaders={campaignTableHeaders}
                  nextPage={nextCampaignsPage}
                  previousPage={previousCampaignsPage}
                  pageInfo={campaignsPageInfo}
                  handleClickRow={clickRow}
                />

                {isAuthenticated() && whoAmI?.id === organization.id && (
                  <>
                    <h3 className="text-center mt-10 font-semibold text-3xl text-gray-900">
                      <InfoMessage id="organization_admin" />
                    </h3>
                    <div className="flex flex-col mt-5 md:flex-row w-full mb-16">
                      <ButtonLink
                        link={`/organization/${organization.id}/edit`}
                        className="md:mr-1 w-full md:w-1/2"
                      >
                        <FormattedMessage id="organization_edit" />
                      </ButtonLink>
                      <ButtonLink
                        link={`/organization/${organization.id}/create-campaign`}
                        className="mt-2 md:mt-0 md:ml-1 w-full md:w-1/2"
                      >
                        <FormattedMessage id="campaing_create" />
                      </ButtonLink>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default OrganizationDetail
