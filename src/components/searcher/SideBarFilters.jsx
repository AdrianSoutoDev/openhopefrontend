import { FormattedMessage } from 'react-intl'
import Icons from '../shared/Icons'
import { Button } from '../shared/Buttons'
import { InfoMessage } from '../shared/Messages'
import useFilters from '../../hooks/useFilters'

function SideBarFilters({
  updateParams,
  searchParams,
  toggleSideBar,
  updateShow,
}) {
  const { entityType, searchText, setSearchText, handleRadioEntityType } =
    useFilters(searchParams, updateParams, updateShow)

  return (
    <>
      <div className="flex flex-col mt-15 md:mt-8 w-full">
        {/* desktop */}
        <h2 className="md:flex hidden text-2xl text-info font-semibold pt-2 mb-5">
          <FormattedMessage id="filter" />
        </h2>

        {/* mobile */}
        <h2 className="w-full flex md:hidden mt-5 mb-2 text-2xl text-info font-semibold justify-between">
          <FormattedMessage id="filter" />
          <div className="mr-2 flex items-end" onClick={() => toggleSideBar()}>
            <Icons.Filters />
          </div>
        </h2>

        {/* common */}
        <div className="mt-2 pt-1">
          <FormattedMessage id="what_search" />
          <input
            type="text"
            id="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2 focus:outline-none"
          />
        </div>

        <div className="mt-2 pt-1">
          <FormattedMessage id="show" />
          <div className="items-center">
            <input
              type="radio"
              name="entityTypes"
              id="radioCampaign"
              value="CAMPAIGN"
              checked={entityType === 'CAMPAIGN'}
              onChange={handleRadioEntityType}
              className="h-4 w-4 text-emerald-500 mr-1"
            />
            <label htmlFor="radioCampaign">
              <InfoMessage id="campaigns" />
            </label>
          </div>

          <div className="items-center">
            <input
              type="radio"
              name="entityTypes"
              id="radioOrganization"
              value="ORGANIZATION"
              checked={entityType === 'ORGANIZATION'}
              onChange={handleRadioEntityType}
              className="h-4 w-4 text-emerald-500 mr-1 mt-1"
            />
            <label htmlFor="radioOrganization">
              <InfoMessage id="organizations" />
            </label>
          </div>
        </div>

        <div className="my-5 md:hidden">
          <Button type="button" onClick={() => toggleSideBar()}>
            <FormattedMessage id="search" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default SideBarFilters
