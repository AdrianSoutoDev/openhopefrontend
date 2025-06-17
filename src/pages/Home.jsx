import { FormattedMessage } from 'react-intl'
import PageTitle from '../components/shared/PageTitle'
import Searcher from '../components/home/Searcher'
import ResumeCampaigns from '../components/home/ResumeCampaigns'
import useSearch from '../hooks/useSearch'

function Home() {
  const { data: newCampaignsData, loading: newCampaignsLoading } = useSearch({
    pageSize: 3,
    searchParams: {
      show: 'CAMPAIGN',
      sortCriteria: 'START_DATE_DESC',
    },
  })

  const {
    data: closeToFinishCampaignsData,
    loading: closeToFinishCampaignsLoading,
  } = useSearch({
    pageSize: 3,
    searchParams: {
      show: 'CAMPAIGN',
      sortCriteria: 'END_DATE_ASC',
      campaignState: 'ONGOING',
      campaignFinalizeType: 'DATE',
    },
  })

  const {
    data: closeToTargetCampaignsData,
    loading: closeToTargetCampaignsLoading,
  } = useSearch({
    pageSize: 3,
    searchParams: {
      show: 'CAMPAIGN',
      sortCriteria: 'CLOSEST_TO_GOAL',
      campaignState: 'ONGOING',
      campaignFinalizeType: 'TARGET',
    },
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
            <Searcher className={'w-full max-w-96 md:max-w-xl '} />
          </div>
        </div>
        <div className="mt-5 flex justify-center w-full">
          <div className="mt-5 flex flex-col items-center max-w-8xl">
            <ResumeCampaigns
              data={newCampaignsData?.content}
              loading={newCampaignsLoading}
              title={<FormattedMessage id="new_campaigns" />}
              resumeType="newCampaigns"
              className="w-full"
            />
            <ResumeCampaigns
              data={closeToFinishCampaignsData?.content}
              loading={closeToFinishCampaignsLoading}
              title={<FormattedMessage id="close_to_finish_campaigns" />}
              resumeType="closeToFinish"
              className="w-full"
            />
            <ResumeCampaigns
              data={closeToTargetCampaignsData?.content}
              loading={closeToTargetCampaignsLoading}
              title={<FormattedMessage id="close_to_target_camapigns" />}
              resumeType="closeToTarget"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
