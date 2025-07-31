import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl'
import { getImgFromServer } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'

function CampaignResult({ item }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/campaign/${item.id}`)
  }

  return (
    <>
      <div
        className="flex mt-2 p-5 cursor-pointer border rounded-sm border-gray-200 flex-col md:flex-row items-center md:items-stretch"
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

        {/* mobile */}
        <div className="w-full md:hidden flex flex-col pt-2 items-center">
          <div className="font-semibold text-info text-2xl">{item.name}</div>

          <div className="text-info text-xl">{item.organization?.name}</div>

          {!item.isOnGoing && (
            <div className="mt-2 pl-2 font-semibold text-danger">
              <FormattedMessage id="campaign_closed" />
            </div>
          )}

          {item?.startAt && (
            <div className="text-info mt-2">
              <FormattedMessage
                id="start_date"
                values={{
                  date: (
                    <FormattedDate
                      value={new Date(item.startAt)}
                      year="numeric"
                      month="2-digit"
                      day="2-digit"
                    />
                  ),
                }}
              />
            </div>
          )}

          {item?.dateLimit && (
            <div className="text-info mt-2">
              <FormattedMessage
                id="finish_date"
                values={{
                  date: (
                    <FormattedDate
                      value={new Date(item.dateLimit)}
                      year="numeric"
                      month="2-digit"
                      day="2-digit"
                    />
                  ),
                }}
              />
            </div>
          )}

          {item?.economicTarget && (
            <div className="text-info">
              <FormattedMessage
                id="target_and_collected"
                values={{
                  amount: (
                    <FormattedNumber
                      value={item.economicTarget}
                      style="currency"
                      currency="EUR"
                    />
                  ),
                  percentage: (
                    <FormattedNumber
                      value={item.percentageCollected}
                      style="percent"
                    />
                  ),
                }}
              />
            </div>
          )}

          <div className="text-info line-clamp-3 mt-2">
            {item?.description
              ?.replace(/<\/?[^>]+(>|$)/g, '')
              .replace(/\n/g, ' ')
              .replace(/&nbsp;/g, ' ')}
          </div>
        </div>

        {/* desktop */}
        <div className="w-full hidden md:flex flex-col justify-between">
          <div>
            <div className="w-full pt-2 flex justify-between">
              <div className="flex items-end">
                <div className="font-semibold text-info text-2xl">
                  {item.name}
                </div>
                {!item.isOnGoing && (
                  <div className="pl-2 font-semibold text-danger">
                    <FormattedMessage id="campaign_closed" />
                  </div>
                )}
              </div>
              {item?.startAt && (
                <div className="text-info">
                  <FormattedMessage
                    id="start_date"
                    values={{
                      date: (
                        <FormattedDate
                          value={new Date(item.startAt)}
                          year="numeric"
                          month="2-digit"
                          day="2-digit"
                        />
                      ),
                    }}
                  />
                </div>
              )}
            </div>

            <div className="text-info text-xl">{item.organization?.name}</div>

            <div className="w-full pt-2 flex justify-between">
              {item.dateLimit && (
                <div className="text-info">
                  <FormattedMessage
                    id="finish_date"
                    values={{
                      date: (
                        <FormattedDate
                          value={new Date(item.dateLimit)}
                          year="numeric"
                          month="2-digit"
                          day="2-digit"
                        />
                      ),
                    }}
                  />
                </div>
              )}

              {item?.economicTarget && (
                <div className="text-info">
                  <FormattedMessage
                    id="target_and_collected"
                    values={{
                      amount: (
                        <FormattedNumber
                          value={item.economicTarget}
                          style="currency"
                          currency="EUR"
                        />
                      ),
                      percentage: (
                        <FormattedNumber
                          value={item.percentageCollected}
                          style="percent"
                        />
                      ),
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="text-info line-clamp-3">
            {item?.description
              ?.replace(/<\/?[^>]+(>|$)/g, '')
              .replace(/\n/g, ' ')
              .replace(/&nbsp;/g, ' ')}
          </div>
        </div>
      </div>
    </>
  )
}

export default CampaignResult
