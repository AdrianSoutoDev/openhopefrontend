import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl'
import { getImgFromServer } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'

function ResumeItem({ className, item, resumeType }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (item) {
      navigate(`/campaign/${item?.id}`)
    }
  }

  return (
    <>
      <div
        className={`flex flex-col md:flex-row p-2 cursor-pointer ${className} w-full items-center md:items-end`}
        onClick={handleClick}
      >
        <div className="min-w-32 max-w-68 float-left mr-2">
          <img
            src={
              item?.image
                ? getImgFromServer(item.image)
                : '/img/default-image.jpg'
            }
            className="rounded-sm"
          />
        </div>
        <div className="flex flex-col md:justify-end">
          <div className="font-semibold text-info">{item?.name}</div>
          <div>
            {resumeType === 'newCampaigns' && (
              <FormattedMessage
                id="starts_at"
                values={{
                  date: (
                    <FormattedDate
                      value={new Date(item?.startAt)}
                      year="numeric"
                      month="2-digit"
                      day="2-digit"
                    />
                  ),
                }}
              />
            )}

            {resumeType === 'closeToFinish' && (
              <FormattedMessage
                id="ends_on"
                values={{
                  date: (
                    <FormattedDate
                      value={new Date(item?.dateLimit)}
                      year="numeric"
                      month="2-digit"
                      day="2-digit"
                    />
                  ),
                }}
              />
            )}

            {resumeType === 'closeToTarget' && (
              <FormattedMessage
                id="collected_of_target"
                values={{
                  percentage: (
                    <FormattedNumber
                      value={item?.percentageCollected}
                      style="percent"
                    />
                  ),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ResumeItem
