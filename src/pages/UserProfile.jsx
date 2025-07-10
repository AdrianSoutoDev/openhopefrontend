import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ButtonLink } from '../components/shared/Buttons'
import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl'
import { InfoMessage } from '../components/shared/Messages'
import useFetch from '../hooks/useFetch'
import DataTable from '../components/shared/DataTable'
import PageTitle from '../components/shared/PageTitle'
import useDataTableData from '../hooks/useDataTableData'

function UserProfile() {
  const { isAuthenticated, whoAmI } = useContext(AuthContext)
  const navigate = useNavigate()
  const [favoriteAccount, setFavoriteAccount] = useState(null)
  const { fetch: updateFavoriteBankAccountFetch } = useFetch()

  //BANK ACCOUNTS
  const bankAccountsHeaders = [
    '',
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
          <label
            htmlFor={`favorite-${obj.iban}`}
            className="cursor-pointer text-2xl"
          >
            <input
              id={`favorite-${obj.iban}`}
              type="radio"
              name="favoriteAccount"
              checked={
                favoriteAccount === null
                  ? obj.favorite
                  : favoriteAccount === obj.iban
              }
              onChange={() => updateFavoriteAccount(objects, obj.iban)}
              className="hidden"
            />
            <span
              className={`${
                favoriteAccount === obj.iban ||
                (favoriteAccount === null && obj.favorite)
                  ? 'text-amber-400'
                  : 'text-gray-200'
              }`}
            >
              ★
            </span>
          </label>,
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

  const donationsMapper = useCallback((objects) => {
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
  }, [])

  const donationsSource = useMemo(
    () => ({
      endpoint: `/donations`,
      options: { method: 'GET' },
    }),
    [],
  )

  const {
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
        <div className="flex justify-center text-center">
          <PageTitle
            title={
              <FormattedMessage
                id="hello_user"
                values={{ user: whoAmI?.email.split('@')[0] }}
              />
            }
            className="mb-[2rem]"
          />
        </div>
        <div className="flex md:flex-row flex-col">
          <div className="md:w-1/2 px-1 md:py-2 md:px-2">
            <h3 className="mt-10 font-semibold text-3xl text-gray-900">
              <InfoMessage id="my_bank_accounts" />
            </h3>
            <DataTable
              className={'mt-5'}
              items={bankAccounts}
              tableHeaders={bankAccountsHeaders}
              nextPage={nextBankAccountPage}
              previousPage={previousBankAccountPage}
              pageInfo={bankAccountsPageInfo}
            />
            {bankAccounts?.length > 1 && (
              <span className="text-sm">
                <InfoMessage id="favorite_instructions" />
              </span>
            )}
            <ButtonLink
              className="max-w-56 mt-3"
              link={`/openbanking/bank-selection?user=me`}
            >
              <FormattedMessage id="add_bank_account" />
            </ButtonLink>
          </div>

          <div className="md:w-1/2 p-2">
            <h3 className="mt-10 font-semibold text-3xl text-gray-900">
              <InfoMessage id="my_donations" />
            </h3>
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
      </div>
    </>
  )
}

export default UserProfile
