import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ButtonLink } from '../components/shared/Buttons'
import DataTable from '../components/shared/DataTable'
import { FormattedMessage } from 'react-intl'

function UserProfile() {
  const { isAuthenticated, whoAmI } = useContext(AuthContext)
  const navigate = useNavigate()

  const bankAccountsSource = {
    endpoint: `/bankAccounts`,
    options: { method: 'GET' },
  }

  const bankAccountsHeaders = [
    <FormattedMessage id="table_headers_bank" />,
    <FormattedMessage id="table_headers_name" />,
    <FormattedMessage id="table_headers_iban" />,
  ]

  const bankAccountsMapper = (objects) => {
    const mappedObjects = []
    objects.forEach((obj) => {
      const values = [obj.aspsp?.name, obj.name?.split('-')[0].trim(), obj.iban]

      mappedObjects.push({
        id: obj.id,
        values: values,
      })
    })

    return mappedObjects
  }

  useEffect(() => {
    if (whoAmI?.type === 'ORGANIZATION') navigate(`/organization/${whoAmI?.id}`)
  }, [isAuthenticated, navigate, whoAmI])

  return (
    <>
      <div>
        <DataTable
          source={bankAccountsSource}
          tableHeaders={bankAccountsHeaders}
          mapper={bankAccountsMapper}
        />

        <ButtonLink
          link={`/openbanking/bank-selection?user=me`}
          className="mt-2 w-full"
        >
          Add bank account
        </ButtonLink>
      </div>
    </>
  )
}

export default UserProfile
