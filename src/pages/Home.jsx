import { FormattedMessage } from 'react-intl'
import PageTitle from '../components/shared/PageTitle'
import TextSearcher from '../components/home/TextSearcher'
import ResumeCampaigns from '../components/home/ResumeCampaigns'
import useSearch from '../hooks/useSearch'

function Home() {
  const searchParamsNewCampaign = {
    show: 'CAMPAIGN',
    sortCriteria: 'START_DATE_DESC',
  }

  const searchParamsCloseToFinishCampaign = {
    show: 'CAMPAIGN',
    sortCriteria: 'END_DATE_ASC',
    campaignState: 'ONGOING',
    campaignFinalizeType: 'DATE',
  }

  const searchParamsCloseToTargetCampaign = {
    show: 'CAMPAIGN',
    sortCriteria: 'CLOSEST_TO_GOAL',
    campaignState: 'ONGOING',
    campaignFinalizeType: 'TARGET',
  }

  const { results: newCampaignsData, loading: newCampaignsLoading } = useSearch(
    {
      pageSize: 3,
      searchParams: searchParamsNewCampaign,
    },
  )

  const {
    results: closeToFinishCampaignsData,
    loading: closeToFinishCampaignsLoading,
  } = useSearch({
    pageSize: 3,
    searchParams: searchParamsCloseToFinishCampaign,
  })

  const {
    results: closeToTargetCampaignsData,
    loading: closeToTargetCampaignsLoading,
  } = useSearch({
    pageSize: 3,
    searchParams: searchParamsCloseToTargetCampaign,
  })

  return (
    <>
      <div className="px-2">
        <div className="mt-10 p-2 flex flex-col justify-center w-full">
          <PageTitle
            title={<FormattedMessage id="welcome" />}
            className={'text-center'}
          />
          <div className="mt-10 p-2 flex justify-center w-full">
            <TextSearcher className={'w-full max-w-96 md:max-w-xl '} />
          </div>
        </div>
        <div className="mt-5 flex justify-center w-full">
          <div className="mt-5 flex flex-col items-center max-w-8xl">
            <ResumeCampaigns
              data={newCampaignsData}
              loading={newCampaignsLoading}
              title={<FormattedMessage id="new_campaigns" />}
              resumeType="newCampaigns"
              className="w-full"
              searchParams={searchParamsNewCampaign}
            />
            <ResumeCampaigns
              data={closeToFinishCampaignsData}
              loading={closeToFinishCampaignsLoading}
              title={<FormattedMessage id="close_to_finish_campaigns" />}
              resumeType="closeToFinish"
              className="w-full"
              searchParams={searchParamsCloseToFinishCampaign}
            />
            <ResumeCampaigns
              data={closeToTargetCampaignsData}
              loading={closeToTargetCampaignsLoading}
              title={<FormattedMessage id="close_to_target_camapigns" />}
              resumeType="closeToTarget"
              className="w-full"
              searchParams={searchParamsCloseToTargetCampaign}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
