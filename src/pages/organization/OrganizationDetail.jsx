import { useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Spinner from '../../components/shared/Spinner'
import AuthContext from '../../context/AuthContext'

function OrganizationDetail() {
  const { id } = useParams()
  const [organization, setOrganization] = useState({})
  const { data, loading, fetch } = useFetch()
  const hasFetched = useRef(false)
  const { isAuthenticated, whoAmI } = useContext(AuthContext)

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
      <h1>{loading ? <Spinner /> : organization.name}</h1>
      {isAuthenticated && !loading && whoAmI === organization.email && (
        <h2>Editar</h2>
      )}
    </>
  )
}

export default OrganizationDetail
