import { useLocation } from 'react-router-dom'
import useSearch from '../hooks/useSearch'
import SideBarFilters from '../components/searcher/SideBarFilters'
import { FormattedMessage, useIntl } from 'react-intl'
import SimpleSelector from '../components/shared/SimpleSelector'
import SearchResults from '../components/searcher/SearchResults'

function Searcher() {
  const intl = useIntl()
  const location = useLocation()
  const searchParams = location.state?.searchParams

  const { data, setParams } = useSearch({
    searchParams: searchParams,
  })

  const ordersBy = [
    { name: intl.formatMessage({ id: 'NAME_ASC' }), sortCriteria: 'NAME_ASC' },
    {
      name: intl.formatMessage({ id: 'NAME_DESC' }),
      sortCriteria: 'NAME_DESC',
    },
    {
      name: intl.formatMessage({ id: 'START_DATE_ASC' }),
      sortCriteria: 'START_DATE_ASC',
    },
    {
      name: intl.formatMessage({ id: 'START_DATE_DESC' }),
      sortCriteria: 'START_DATE_DESC',
    },
    {
      name: intl.formatMessage({ id: 'END_DATE_ASC' }),
      sortCriteria: 'END_DATE_ASC',
    },
    {
      name: intl.formatMessage({ id: 'END_DATE_DESC' }),
      sortCriteria: 'END_DATE_DESC',
    },
    {
      name: intl.formatMessage({ id: 'TARGET_AMOUNT_ASC' }),
      sortCriteria: 'TARGET_AMOUNT_ASC',
    },
    {
      name: intl.formatMessage({ id: 'TARGET_AMOUNT_DESC' }),
      sortCriteria: 'TARGET_AMOUNT_DESC',
    },
    {
      name: intl.formatMessage({ id: 'MIN_DONATION_ASC' }),
      sortCriteria: 'MIN_DONATION_ASC',
    },
    {
      name: intl.formatMessage({ id: 'MIN_DONATION_DESC' }),
      sortCriteria: 'MIN_DONATION_DESC',
    },
    {
      name: intl.formatMessage({ id: 'CLOSEST_TO_GOAL' }),
      sortCriteria: 'CLOSEST_TO_GOAL',
    },
    {
      name: intl.formatMessage({ id: 'FARTHEST_FROM_GOAL' }),
      sortCriteria: 'FARTHEST_FROM_GOAL',
    },
  ]

  const handleOrderBy = (item) => {
    setParams((prevParams) => ({
      ...prevParams,
      sortCriteria: item.sortCriteria,
    }))
  }

  return (
    <>
      <div className="flex">
        <div>
          <SideBarFilters />
        </div>
        <div className="w-full flex flex-col justify-between mt-10 px-2">
          <div className="flex flex-col md:flex-row justify-between">
            <h2 className="mb-2 text-2xl text-info font-semibold">
              <FormattedMessage id="results" />
            </h2>
            <SimpleSelector
              sourceItems={
                searchParams?.show === 'CAMPAIGN'
                  ? ordersBy
                  : ordersBy.slice(0, 2)
              }
              setItemSelected={handleOrderBy}
              defaultItem={
                searchParams?.sortCriteria
                  ? ordersBy.find(
                      (o) => o.sortCriteria === searchParams?.sortCriteria,
                    )
                  : ordersBy[0]
              }
            />
          </div>
          <SearchResults items={data?.content} type={searchParams?.show} />
        </div>
      </div>
    </>
  )
}

export default Searcher
