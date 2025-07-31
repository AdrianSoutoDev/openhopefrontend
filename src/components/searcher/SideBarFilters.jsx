import { FormattedMessage, useIntl } from 'react-intl'
import Icons from '../shared/Icons'
import { Button } from '../shared/Buttons'
import { InfoMessage } from '../shared/Messages'
import useFilters from '../../hooks/useFilters'
import MultipleSelector from '../shared/MultipleSelector'
import DatePicker from 'react-datepicker'

function SideBarFilters({
  updateParams,
  searchParams,
  toggleSideBar,
  updateShow,
}) {
  const intl = useIntl()

  const {
    entityType,
    searchText,
    setSearchText,
    setEntityType,
    categoriesSelected,
    setCategoriesSelected,
    startAtFrom,
    setStartAtFrom,
    startAtTo,
    setStartAtTo,
    campaignState,
    setCampaignState,
    campaignFinalizeType,
    setCampaignFinalizeType,
    hasMinimumDonation,
    setHasMinimumDonation,
    hasCampaignsOnGoing,
    setHasCampaignsOnGoing,
    finalizeDateFrom,
    setFinalizeDateFrom,
    finalizeDateTo,
    setFinalizeDateTo,
    economicTargetFrom,
    setEconomicTargetFrom,
    economicTargetTo,
    setEconomicTargetTo,
    minimumDonationFrom,
    setMinimumDonationFrom,
    minimumDonationTo,
    setMinimumDonationTo,
    reset,
  } = useFilters(searchParams, updateParams, updateShow)

  const categoriesSource = {
    endpoint: '/categories',
    options: { method: 'GET' },
  }

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
          <label htmlFor="searchText">
            <FormattedMessage id="what_search" />
          </label>
          <input
            type="text"
            id="searchText"
            placeholder={intl.formatMessage({ id: 'write_here' })}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2 focus:outline-none"
          />
        </div>

        <div className="mt-2 pt-2">
          <label htmlFor="radioShow">
            <FormattedMessage id="show" />
          </label>

          <div id="radioShow" className="items-center">
            <input
              type="radio"
              name="entityTypes"
              id="radioCampaign"
              value="CAMPAIGN"
              checked={entityType === 'CAMPAIGN'}
              onChange={(e) => setEntityType(e.target.value)}
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
              onChange={(e) => setEntityType(e.target.value)}
              className="h-4 w-4 text-emerald-500 mr-1 mt-1"
            />
            <label htmlFor="radioOrganization">
              <InfoMessage id="organizations" />
            </label>
          </div>
        </div>

        <div className="mt-2 pt-2">
          <label htmlFor="categories">
            <FormattedMessage id="label_categories" />
          </label>
          <MultipleSelector
            source={categoriesSource}
            selectedItems={categoriesSelected}
            setSelectedItems={setCategoriesSelected}
            className="my-2"
          />
        </div>

        <div className="mt-2 pt-2">
          <label htmlFor="start-date">
            <FormattedMessage id="campaign_start_date" />
          </label>
          <div id="start">
            <div className="mt-2">
              <label htmlFor="start-date-from" className="text-sm">
                <FormattedMessage id="from" />
              </label>
              <div
                className={`flex w-full md:ml-1 rounded-lg shadow-sm border input-primary my-2 px-4 py-2 focus:outline-none ${entityType !== 'CAMPAIGN' ? 'bg-gray-300 hover:bg-gray-300 text-gray-600 cursor-default border-gray-600' : 'text-info'}`}
              >
                <label htmlFor="start-date-from" className="pt-1">
                  <Icons.Calendar />
                </label>
                <div className="pl-2 focus:outline-none">
                  <DatePicker
                    disabled={entityType !== 'CAMPAIGN'}
                    id="start-date-from"
                    selected={startAtFrom}
                    onChange={setStartAtFrom}
                    className="focus:outline-none "
                    placeholderText={intl.formatMessage({
                      id: 'select_date_start',
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="mt-2">
              <label htmlFor="start-date-to" className="text-sm">
                <FormattedMessage id="to" />
              </label>
              <div
                disabled={entityType !== 'CAMPAIGN'}
                className={`flex w-full md:ml-1 rounded-lg shadow-sm border input-primary my-2 px-4 py-2 focus:outline-none ${entityType !== 'CAMPAIGN' ? 'bg-gray-300 hover:bg-gray-300 text-gray-600 cursor-default border-gray-600' : 'text-info'}`}
              >
                <label htmlFor="start-date-to" className="pt-1">
                  <Icons.Calendar />
                </label>
                <div className="pl-2 focus:outline-none">
                  <DatePicker
                    disabled={entityType !== 'CAMPAIGN'}
                    id="start-date-to"
                    selected={startAtTo}
                    onChange={setStartAtTo}
                    className="focus:outline-none"
                    placeholderText={intl.formatMessage({
                      id: 'select_date_start',
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2">
          <FormattedMessage id="campaigns" />

          <div className="items-center">
            <input
              type="radio"
              name="campaign-state"
              id="campaign-ongoing"
              value="ONGOING"
              checked={campaignState === 'ONGOING'}
              onChange={(e) => setCampaignState(e.target.value)}
              className="h-4 w-4 text-emerald-500 mr-1"
              disabled={entityType !== 'CAMPAIGN'}
            />
            <label htmlFor="campaign-ongoing">
              <InfoMessage id="in_course" />
            </label>
          </div>

          <div className="items-center">
            <input
              type="radio"
              name="campaign-state"
              id="campaign-closed"
              value="FINALIZED"
              checked={campaignState === 'FINALIZED'}
              onChange={(e) => setCampaignState(e.target.value)}
              className="h-4 w-4 text-emerald-500 mr-1 mt-1"
              disabled={entityType !== 'CAMPAIGN'}
            />
            <label htmlFor="campaign-closed">
              <InfoMessage id="campaigns_closed" />
            </label>
          </div>

          <div className="items-center">
            <input
              type="radio"
              name="campaign-state"
              id="campaigns-state-all"
              value="ALL"
              checked={campaignState === 'ALL'}
              onChange={(e) => setCampaignState(e.target.value)}
              className="h-4 w-4 text-emerald-500 mr-1 mt-1"
              disabled={entityType !== 'CAMPAIGN'}
            />
            <label htmlFor="campaigns-state-all">
              <InfoMessage id="all" />
            </label>
          </div>
        </div>

        <div className="mt-2 pt-2">
          <FormattedMessage id="campaigns_finalize_types" />

          <div className="items-center">
            <input
              type="radio"
              name="campaign-finalization"
              id="campaign-finalize-date"
              value="DATE"
              checked={campaignFinalizeType === 'DATE'}
              onChange={(e) => setCampaignFinalizeType(e.target.value)}
              className="h-4 w-4 text-emerald-500 mr-1"
              disabled={entityType !== 'CAMPAIGN'}
            />
            <label htmlFor="campaign-finalize-date">
              <InfoMessage id="by_date" />
            </label>
          </div>

          <div className="items-center">
            <input
              type="radio"
              name="campaign-finalization"
              id="campaign-finalize-target"
              value="TARGET"
              checked={campaignFinalizeType === 'TARGET'}
              onChange={(e) => setCampaignFinalizeType(e.target.value)}
              className="h-4 w-4 text-emerald-500 mr-1 mt-1"
              disabled={entityType !== 'CAMPAIGN'}
            />
            <label htmlFor="campaign-finalize-target">
              <InfoMessage id="by_target" />
            </label>
          </div>

          <div className="items-center">
            <input
              type="radio"
              name="campaign-finalization"
              id="campaign-finalize-all"
              value="ALL"
              checked={campaignFinalizeType === 'ALL'}
              onChange={(e) => setCampaignFinalizeType(e.target.value)}
              className="h-4 w-4 text-emerald-500 mr-1 mt-1"
              disabled={entityType !== 'CAMPAIGN'}
            />
            <label htmlFor="campaign-finalize-all">
              <InfoMessage id="all" />
            </label>
          </div>
        </div>

        <div className="mt-2 pt-2">
          <FormattedMessage id="donations" />

          <div className="items-center">
            <input
              type="checkbox"
              id="campaign-has-minimum-donation"
              checked={hasMinimumDonation}
              onChange={(e) => setHasMinimumDonation(e.target.checked)}
              className="h-4 w-4 text-emerald-500 mr-1"
              disabled={entityType !== 'CAMPAIGN'}
            />
            <label htmlFor="campaign-has-minimum-donation">
              <InfoMessage id="dont_has_minimum_donation" />
            </label>
          </div>
        </div>

        <div className="mt-2 pt-2">
          <FormattedMessage id="organizations" />

          <div className="items-center">
            <input
              type="checkbox"
              id="organizations-has-campaigns"
              checked={hasCampaignsOnGoing}
              onChange={(e) => setHasCampaignsOnGoing(e.target.checked)}
              className="h-4 w-4 text-emerald-500 mr-1"
              disabled={entityType !== 'ORGANIZATION'}
            />
            <label htmlFor="organizations-has-campaigns">
              <InfoMessage id="has_campaigns_in_course" />
            </label>
          </div>
        </div>

        <div className="mt-2 pt-2">
          <FormattedMessage id="campaign_finalize_date" />
          <div>
            <div className="mt-2">
              <label htmlFor="finalize-date-from" className="text-sm">
                <FormattedMessage id="from" />
              </label>
              <div
                className={`flex w-full md:ml-1 rounded-lg shadow-sm border input-primary my-2 px-4 py-2 focus:outline-none ${entityType !== 'CAMPAIGN' ? 'bg-gray-300 hover:bg-gray-300 text-gray-600 cursor-default border-gray-600' : 'text-info'}`}
              >
                <label htmlFor="finalize-date-from" className="pt-1">
                  <Icons.Calendar />
                </label>
                <div className="pl-2 focus:outline-none">
                  <DatePicker
                    disabled={entityType !== 'CAMPAIGN'}
                    id="finalize-date-from"
                    selected={finalizeDateFrom}
                    onChange={setFinalizeDateFrom}
                    placeholderText={intl.formatMessage({
                      id: 'select_date_start',
                    })}
                    className="focus:outline-none "
                  />
                </div>
              </div>
            </div>

            <div className="mt-2">
              <label htmlFor="finalize-date-to" className="text-sm">
                <FormattedMessage id="to" />
              </label>
              <div
                disabled={entityType !== 'CAMPAIGN'}
                className={`flex w-full md:ml-1 rounded-lg shadow-sm border input-primary my-2 px-4 py-2 focus:outline-none ${entityType !== 'CAMPAIGN' ? 'bg-gray-300 hover:bg-gray-300 text-gray-600 cursor-default border-gray-600' : 'text-info'}`}
              >
                <label htmlFor="finalize-date-to" className="pt-1">
                  <Icons.Calendar />
                </label>
                <div className="pl-2 focus:outline-none">
                  <DatePicker
                    disabled={entityType !== 'CAMPAIGN'}
                    id="finalize-date-to"
                    selected={finalizeDateTo}
                    onChange={setFinalizeDateTo}
                    placeholderText={intl.formatMessage({
                      id: 'select_date_start',
                    })}
                    className="focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2">
          <FormattedMessage id="campaign_economic_target" />
          <div className="flex">
            <div className="mt-2 pt-1 mr-1">
              <label htmlFor="economicTargetFrom" className="text-sm">
                <FormattedMessage id="from" />
              </label>
              <input
                type="number"
                id="economicTargetFrom"
                value={economicTargetFrom}
                onChange={(e) => setEconomicTargetFrom(e.target.value)}
                disabled={entityType !== 'CAMPAIGN'}
                className="text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2 focus:outline-none disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-gray-600 disabled:cursor-default
              disabled:hover:text-gray-600 disabled:border-gray-600"
                placeholder={intl.formatMessage({
                  id: 'default_euros',
                })}
              />
            </div>
            <div className="mt-2 pt-1 ml-1">
              <label htmlFor="economicTargetTo" className="text-sm">
                <FormattedMessage id="to" />
              </label>
              <input
                type="number"
                id="economicTargetTo"
                value={economicTargetTo}
                onChange={(e) => setEconomicTargetTo(e.target.value)}
                disabled={entityType !== 'CAMPAIGN'}
                className="text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2 focus:outline-none disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-gray-600 disabled:cursor-default
              disabled:hover:text-gray-600 disabled:border-gray-600"
                placeholder={intl.formatMessage({
                  id: 'default_euros',
                })}
              />
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2">
          <FormattedMessage id="campaign_minimum_donation" />
          <div className="flex">
            <div className="mt-2 pt-1 mr-1">
              <label htmlFor="minimumDonationFrom" className="text-sm">
                <FormattedMessage id="from" />
              </label>
              <input
                type="number"
                id="minimumDonationFrom"
                value={minimumDonationFrom}
                onChange={(e) => setMinimumDonationFrom(e.target.value)}
                disabled={entityType !== 'CAMPAIGN'}
                className="text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2 focus:outline-none disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-gray-600 disabled:cursor-default
              disabled:hover:text-gray-600 disabled:border-gray-600"
                placeholder={intl.formatMessage({
                  id: 'default_euros',
                })}
              />
            </div>
            <div className="mt-2 pt-1 ml-1">
              <label htmlFor="minimumDonationTo" className="text-sm">
                <FormattedMessage id="to" />
              </label>
              <input
                type="number"
                id="minimumDonationTo"
                value={minimumDonationTo}
                onChange={(e) => setMinimumDonationTo(e.target.value)}
                disabled={entityType !== 'CAMPAIGN'}
                className="text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2 focus:outline-none disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-gray-600 disabled:cursor-default
              disabled:hover:text-gray-600 disabled:border-gray-600"
                placeholder={intl.formatMessage({
                  id: 'default_euros',
                })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-around md:justify-start">
          <div className="my-5 md:hidden flex">
            <Button type="button" onClick={() => toggleSideBar()}>
              <FormattedMessage id="search" />
            </Button>
          </div>

          <div className="my-5 flex">
            <Button type="button" onClick={() => reset()}>
              <FormattedMessage id="clear" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBarFilters
