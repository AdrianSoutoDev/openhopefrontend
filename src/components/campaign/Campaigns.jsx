import { useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { InfoMessage } from '../shared/Messages'
import { Link } from 'react-router-dom'
import { getImgFromServer } from '../../utils/utils'

function CampaignMoreCampaigns({ organizationId, campaignId }) {
  const [campaigns, setCampaigns] = useState([])
  const { data, fetch } = useFetch()
  const hasFetched = useRef(false)

  useEffect(() => {
    if (!hasFetched.current && organizationId) {
      const endpoint = `/organizations/${organizationId}/campaigns?page=0&size=5`
      fetch(endpoint, { method: 'GET' })
      hasFetched.current = true
    }
  }, [fetch, organizationId])

  useEffect(() => {
    if (data) {
      let list = data.content.filter((item) => item.id !== campaignId)
      list = list.length > 4 ? list.slice(0, 4) : list
      setCampaigns(list)
    }
  }, [data, campaignId])

  return (
    <>
      {campaigns && campaigns.length > 0 && (
        <div className="flex flex-col m-2 p-3 border border-gray-200 rounded-sm">
          <InfoMessage id="other_campaigns" className="text-xl font-semibold" />
          <div className="flex flex-wrap justify-around">
            {campaigns.map((campaign, index) => (
              <Link
                key={index}
                to={`/campaign/${campaign.id}`}
                className="text-info cursor-pointer text-center my-3 w-40"
              >
                <div className="m-2 w-40 h-40 overflow-hidden">
                  <img
                    src={
                      campaign.image
                        ? getImgFromServer(campaign.image)
                        : '/img/default-image.jpg'
                    }
                    className="w-full h-full object-cover rounded-sm border border-gray-200 hover:border-emerald-400"
                  />
                </div>
                <p className="mt-2 text-sm">{campaign.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default CampaignMoreCampaigns
