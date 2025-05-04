import { useParams } from 'react-router-dom'
import useValidation from '../../hooks/useValidation'
import DatePicker from 'react-datepicker'
import { useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { InfoMessage } from '../../components/shared/Messages'
import Icons from '../../components/shared/Icons'
import { Button } from '../../components/shared/Buttons'
import useCreateCampaign from '../../hooks/useCreateCampaign'
import Spinner from '../../components/shared/Spinner'
import { format } from 'date-fns'
import useFetch from '../../hooks/useFetch'
import MultipleSelector from '../../components/shared/MultipleSelector'
import PageTitle from '../../components/shared/PageTitle'
import GoBackContext from '../../context/GoBackContext'

function CampaignCreate() {
  const { id } = useParams()
  const { create, loading } = useCreateCampaign()
  const [organization, setOrganization] = useState({})
  const { data, fetch } = useFetch()
  const hasFetched = useRef(false)
  const [startAt, setStartAt] = useState(new Date())
  const [dateLimit, setDateLimit] = useState(null)
  const [image, setImage] = useState(null)
  const [categoriesSelected, setCategoriesSelected] = useState([])
  const { setShowGoBack, setWhereWeGo } = useContext(GoBackContext)

  useEffect(() => {
    setShowGoBack(true)
    setWhereWeGo(`/organization/${id}`)
  }, [id, setShowGoBack, setWhereWeGo])

  useEffect(() => {
    if (!hasFetched.current) {
      const endpoint = `/organizations/${id}`
      const options = { method: 'GET' }
      fetch(endpoint, options)
      hasFetched.current = true
    }
  }, [fetch, id])

  useEffect(() => {
    if (data) {
      setOrganization(data)
    }
  }, [data])

  const nameValidation = useValidation('', {
    required: true,
    messages: {
      required: <FormattedMessage id="name_error_empty" />,
    },
  })

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isNameValid = nameValidation.validate()

    if (isNameValid) {
      const localDateFormat = 'yyyy-MM-dd'
      const startAtFormated = format(startAt, localDateFormat)
      let dateLimitFormated = dateLimit
        ? format(dateLimit, localDateFormat)
        : null
      create(
        id,
        nameValidation.value,
        startAtFormated,
        dateLimitFormated,
        image,
      )
    }
  }

  return (
    <>
      <PageTitle title={organization.name} className="mb-5" />
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
                <div className="w-full">
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
                        required
                        selected={startAt}
                        onChange={setStartAt}
                        className="focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <label htmlFor="dateLimit">
                    <InfoMessage id="campaign_date_limit" /> (
                    <InfoMessage id="optional" />)
                  </label>
                  <div className="flex w-full md:ml-1 text-info rounded-lg shadow-sm border input-primary my-2 px-4 py-2 focus:outline-none">
                    <div className="pt-1">
                      <Icons.Calendar />
                    </div>
                    <div className="pl-2 focus:outline-none">
                      <DatePicker
                        id="dateLimit"
                        selected={dateLimit}
                        onChange={setDateLimit}
                        className="focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:flex">
                <div className="w-full md:mr-1">
                  <label htmlFor="image">
                    <InfoMessage id="campaign_profile_image" />
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 my-2 block text-sm shadow-sm rounded-lg text-info border input-primary cursor-pointer focus:outline-none hover:border-emerald-400"
                  />
                </div>

                <div className="w-full md:ml-1">
                  <label htmlFor="categories">
                    <InfoMessage id="label_categories" />
                  </label>
                  <MultipleSelector
                    sourceItems={organization ? organization.categories : []}
                    selectedItems={categoriesSelected}
                    setSelectedItems={setCategoriesSelected}
                    maxCategories={
                      organization
                        ? organization.categories
                          ? organization.categories.length
                          : 0
                        : 0
                    }
                    className="my-2"
                  />
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
