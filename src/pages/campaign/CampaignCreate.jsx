import { useParams } from 'react-router-dom'
import useValidation from '../../hooks/useValidation'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { InfoMessage } from '../../components/shared/Messages'
import Icons from '../../components/shared/Icons'
import { Button } from '../../components/shared/Buttons'
import useCreateCampaign from '../../hooks/useCreateCampaign'
import Spinner from '../../components/shared/Spinner'
import { format } from 'date-fns'

function CampaignCreate() {
  const { id } = useParams()
  const { create, loading } = useCreateCampaign()
  const [startAt, setStartAt] = useState(new Date())
  const [dateLimit, setDateLimit] = useState(null)

  const nameValidation = useValidation('', {
    required: true,
    messages: {
      required: <FormattedMessage id="name_error_empty" />,
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const isNameValid = nameValidation.validate()

    if (isNameValid) {
      const localDateFormat = 'yyyy-MM-dd'
      const startAtFormated = format(startAt, localDateFormat)
      let dateLimitFormated = null
      if (dateLimit) {
        dateLimitFormated = format(dateLimit, localDateFormat)
      }
      create(id, nameValidation.value, startAtFormated, dateLimitFormated)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="p-4 max-w-96 md:max-w-2xl">
          <div className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">
                  <InfoMessage id="campaign_name" />
                </label>
                <input
                  type="text"
                  id="name"
                  value={nameValidation.value}
                  onChange={nameValidation.handleChange}
                  required
                  onInvalid={nameValidation.onInvalid}
                  className="text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2 focus:outline-none"
                />
                {nameValidation.error && (
                  <p className="text-danger mb-2">{nameValidation.error}</p>
                )}
              </div>

              <div className="flex flex-col md:flex-row">
                <div>
                  <label htmlFor="startAt">
                    <InfoMessage id="campaign_start_date" />
                  </label>
                  <div className="flex w-full md:mr-1 text-info rounded-lg shadow-sm border input-primary my-2 px-4 py-2 focus:outline-none">
                    <div className="pt-1">
                      <Icons.Calendar />
                    </div>
                    <div className="pl-2 focus:outline-none">
                      <DatePicker
                        id="startAt"
                        selected={startAt}
                        onChange={(date) => setStartAt(date)}
                        className="focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <label htmlFor="dateLimit">
                    <InfoMessage id="campaign_date_limit" />
                  </label>
                  <div className="flex w-full md:ml-1 text-info rounded-lg shadow-sm border input-primary my-2 px-4 py-2 focus:outline-none">
                    <div className="pt-1">
                      <Icons.Calendar />
                    </div>
                    <div className="pl-2 focus:outline-none">
                      <DatePicker
                        id="dateLimit"
                        selected={dateLimit}
                        onChange={(date) => setDateLimit(date)}
                        className="focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:flex">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full my-2"
                >
                  {loading && <Spinner />}
                  {!loading && <FormattedMessage id="create_campaign" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CampaignCreate
