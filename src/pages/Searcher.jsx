import { useLocation } from 'react-router-dom'
import useSearch from '../hooks/useSearch'
import SideBarFilters from '../components/searcher/SideBarFilters'
import { FormattedMessage, useIntl } from 'react-intl'
import SimpleSelector from '../components/shared/SimpleSelector'
import SearchResults from '../components/searcher/SearchResults'
import { useCallback, useEffect, useState } from 'react'
import Icons from '../components/shared/Icons'

function Searcher() {
  const intl = useIntl()
  const location = useLocation()
  const searchParams = location.state?.searchParams
  const [show, setShow] = useState(searchParams.show || 'CAMPAIGN')
  const [previousScroll, setPreviousScroll] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const toggleSideBar = () => {
    setIsOpen(!isOpen)
  }

  const { results, updateParams, nextPage } = useSearch({
    searchParams: searchParams || { show: 'CAMPAIGN' },
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
    updateParams((prevParams) => ({
      ...prevParams,
      sortCriteria: item.sortCriteria,
    }))
  }

  const handleShowMoreCampaigns = useCallback(() => {
    nextPage()
  }, [nextPage])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement

      if (scrollTop > previousScroll) {
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          handleShowMoreCampaigns()
        }
      }

      setPreviousScroll(scrollTop)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [previousScroll, handleShowMoreCampaigns])

  return (
    <>
      <div className="flex">
        <div
          className={`${isOpen ? 'flex' : 'hidden'} md:flex md:static fixed inset-0 z-40 bg-white px-2 overflow-y-auto h-screen`}
        >
          <SideBarFilters
            updateParams={updateParams}
            searchParams={searchParams}
            toggleSideBar={toggleSideBar}
            updateShow={setShow}
          />
        </div>
        <div className="w-full flex flex-col justify-between mt-5 md:mt-10 px-2">
          <div className="flex flex-col md:flex-row justify-between">
            <h2 className="mb-2 text-2xl text-info font-semibold flex justify-between">
              <FormattedMessage id="results" />
              <div
                className="flex md:hidden mr-2 items-end"
                onClick={() => toggleSideBar()}
              >
                <Icons.Filters />
              </div>
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
          <SearchResults items={results} type={show} />
        </div>
      </div>
    </>
  )
}

export default Searcher
