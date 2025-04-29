import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Spinner from '../../components/shared/Spinner'
import AuthContext from '../../context/AuthContext'
import { getImgFromServer } from '../../utils/utils'
import DataTable from '../../components/shared/DataTable'
import { FormattedMessage } from 'react-intl'
import { InfoMessage } from '../../components/shared/Messages'

function OrganizationDetail() {
  const { id } = useParams()
  const [organization, setOrganization] = useState({})
  const { data, loading, fetch } = useFetch()
  const hasFetched = useRef(false)
  const { isAuthenticated, whoAmI } = useContext(AuthContext)
  const navigate = useNavigate()

  const campaignsSource = {
    endpoint: `/organizations/${id}/campaigns`,
    options: { method: 'GET' },
  }

  const campaignTableHeaders = [
    <FormattedMessage id="table_headers_name" />,
    <FormattedMessage id="table_headers_start_at" />,
    <FormattedMessage id="table_headers_state" />,
    <FormattedMessage id="table_headers_amount_collected" />,
  ]

  const campaignsMapper = (objects) => {
    const mappedObjects = []

    objects.forEach((obj) => {
      const values = [
        obj.name,
        obj.startAt,
        obj.isOnGoing ? 'En Curso' : 'Finalizado en ' + obj.finalizedDate,
        obj.amountCollected + '€',
      ]

      mappedObjects.push({
        id: obj.id,
        values: values,
      })
    })

    return mappedObjects
  }

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
        <div className="mt-12 px-2 flex justify-center">
          <div className="md:max-w-8/12 flex flex-col justify-center items-center">
            <h1 className="mb-5 font-semibold text-5xl text-gray-900">
              {organization.name}
            </h1>
            {organization.categories && (
              <div className="mt-2 w-full flex justify-evenly text-xs text-primary">
                {organization.categories.map((cat) => (
                  <div key={cat.id}>{cat.name}</div>
                ))}
              </div>
            )}

            <div className="mt-3">
              <img
                src={
                  organization.image
                    ? getImgFromServer(organization.image)
                    : '/img/default-image.jpg'
                }
              />
            </div>
            {organization.description && (
              <div className="mt-3">
                <RenderHTML htmlString={organization.description} />
              </div>
            )}

            <div className="w-full">
              <h3 className="text-center md:text-left mt-10 font-semibold text-3xl text-gray-900">
                <InfoMessage id="campaigns" />
              </h3>
            </div>

            <DataTable
              source={campaignsSource}
              tableHeaders={campaignTableHeaders}
              mapper={campaignsMapper}
              handleClickRow={clickRow}
            />

            {isAuthenticated && whoAmI === organization.email && (
              <div className="mt-2">Editar</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default OrganizationDetail
