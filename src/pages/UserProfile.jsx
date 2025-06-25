import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ButtonLink } from '../components/shared/Buttons'
import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl'
import { InfoMessage } from '../components/shared/Messages'
import useFetch from '../hooks/useFetch'
import DataTableSimple from '../components/shared/DataTableSimple'
import useDataTableData from '../hooks/useDataTableData'

function UserProfile() {
  const { isAuthenticated, whoAmI } = useContext(AuthContext)
  const navigate = useNavigate()
  const [favoriteAccount, setFavoriteAccount] = useState(null)
  const { fetch: updateFavoriteBankAccountFetch } = useFetch()

  //BANK ACCOUNTS
  const bankAccountsHeaders = [
    <FormattedMessage id="table_headers_favorite" />,
    <FormattedMessage id="table_headers_bank" />,
    <FormattedMessage id="table_headers_name" />,
    <FormattedMessage id="table_headers_iban" />,
  ]

  const updateFavoriteAccount = useCallback(
    (objects, value) => {
      const bankAccount = objects.find((o) => o.iban === value)

      let endpoint = `/users/bank-account`
      const options = {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(bankAccount),
      }

      updateFavoriteBankAccountFetch(endpoint, options)
      setFavoriteAccount(value)
    },
    [updateFavoriteBankAccountFetch],
  )

  const bankAccountsMapper = useCallback(
    (objects) => {
      const mappedObjects = []
      objects.forEach((obj) => {
        const values = [
          <input
            type="radio"
            name="favoriteAccount"
            checked={
              favoriteAccount === null
                ? obj.favorite
                : favoriteAccount === obj.iban
            }
            onChange={() => updateFavoriteAccount(objects, obj.iban)}
          />,
          obj.aspsp?.name,
          obj.name?.split('-')[0].trim(),
          obj.iban,
        ]

        mappedObjects.push({
          id: obj.id,
          values: values,
        })
      })

      return mappedObjects
    },
    [favoriteAccount, updateFavoriteAccount],
  )

  const bankAccountsSource = useMemo(
    () => ({
      endpoint: `/bank-accounts`,
      options: { method: 'GET' },
    }),
    [],
  )

  const {
    loading: bankAccountsLoading,
    items: bankAccounts,
    pageInfo: bankAccountsPageInfo,
    nextPage: nextBankAccountPage,
    previousPage: previousBankAccountPage,
  } = useDataTableData(bankAccountsSource, bankAccountsMapper)

  //DONATIONS
  const donationsHeaders = [
    <FormattedMessage id="table_headers_campaign" />,
    <FormattedMessage id="table_headers_amount" />,
    <FormattedMessage id="table_headers_date" />,
    <FormattedMessage id="table_headers_bank" />,
    <FormattedMessage id="table_headers_account" />,
  ]

  const donationsMapper = (objects) => {
    const mappedObjects = []
    objects.forEach((obj) => {
      const values = [
        obj.campaign?.name,
        <FormattedNumber value={obj.amount} style="currency" currency="EUR" />,
        <FormattedDate
          value={new Date(obj.date)}
          year="numeric"
          month="2-digit"
          day="2-digit"
        />,
        obj.bankAccount?.aspsp?.name,
        obj.bankAccount?.name,
      ]

      mappedObjects.push({
        id: obj.id,
        values: values,
      })
    })

    return mappedObjects
  }

  const donationsSource = useMemo(
    () => ({
      endpoint: `/donations`,
      options: { method: 'GET' },
    }),
    [],
  )

  const {
    loading: donationsLoading,
    items: donations,
    pageInfo: donationsPageInfo,
    nextPage: donationsNextPage,
    previousPage: donationsPreviousPage,
  } = useDataTableData(donationsSource, donationsMapper)

  useEffect(() => {
    if (whoAmI?.type === 'ORGANIZATION') navigate(`/organization/${whoAmI?.id}`)
  }, [isAuthenticated, navigate, whoAmI])

  return (
    <>
      <div>
        <div className="flex md:flex-row flex-col">
          <div className="md:w-1/2 px-1 md:py-2 md:px-2">
            <h3 className="mt-10 font-semibold text-3xl text-gray-900">
              <InfoMessage id="my_bank_accounts" />
            </h3>
            <DataTableSimple
              items={bankAccounts}
              loading={bankAccountsLoading}
              tableHeaders={bankAccountsHeaders}
              nextPage={nextBankAccountPage}
              previousPage={previousBankAccountPage}
              pageInfo={bankAccountsPageInfo}
            />

            <ButtonLink
              className="w-full md:w-6/12"
              link={`/openbanking/bank-selection?user=me`}
            >
              <FormattedMessage id="add_bank_account" />
            </ButtonLink>
          </div>

          <div className="md:w-1/2 p-2">
            <h3 className="mt-10 font-semibold text-3xl text-gray-900">
              <InfoMessage id="my_donations" />
            </h3>
            <DataTableSimple
              items={donations}
              loading={donationsLoading}
              tableHeaders={donationsHeaders}
              nextPage={donationsNextPage}
              previousPage={donationsPreviousPage}
              pageInfo={donationsPageInfo}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
