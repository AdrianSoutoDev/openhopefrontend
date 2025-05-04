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
import TextEditor from '../../components/shared/TextEditor'

function CampaignCreate() {
  const { id } = useParams()
  const { setShowGoBack, setWhereWeGo } = useContext(GoBackContext)
  const { create, loading } = useCreateCampaign()
  const [organization, setOrganization] = useState({})
  const { data, fetch } = useFetch()
  const hasFetched = useRef(false)
  const [startAt, setStartAt] = useState(new Date())
  const [dateLimit, setDateLimit] = useState(null)
  const [image, setImage] = useState(null)
  const [categoriesSelected, setCategoriesSelected] = useState([])
  const [description, setDescription] = useState('')

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

  const economicTargetValidation = useValidation('', {
    format: /^\d*$/,
    messages: {
      format: <FormattedMessage id="integer_error_format" />,
    },
  })

  const minimumDonationValidation = useValidation('', {
    format: /^\d+([.,]\d+)?$/,
    messages: {
      format: <FormattedMessage id="decimal_error_format" />,
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
    const isEconomicTargetValid =
      !economicTargetValidation.value ||
      Number(economicTargetValidation.value) === 0 ||
      economicTargetValidation.validate()

    const isMinimumDonationValid =
      !minimumDonationValidation.value ||
      Number(minimumDonationValidation.value) === 0 ||
      minimumDonationValidation.validate()

    if (isNameValid && isEconomicTargetValid && isMinimumDonationValid) {
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
        economicTargetValidation.value,
        minimumDonationValidation.value,
        description,
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
                  <InfoMessage id="campaign_name" /> *
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
                    <InfoMessage id="campaign_start_date" /> *
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
                <div className="w-full md:mr-1">
                  <label htmlFor="economicTarget">
                    <InfoMessage id="campaign_economic_taget" />
                  </label>
                  <input
                    type="number"
                    id="economicTarget"
                    value={economicTargetValidation.value}
                    onChange={economicTargetValidation.handleChange}
                    className="w-full px-4 py-3 my-2 block text-sm shadow-sm rounded-lg text-info border input-primary focus:outline-none hover:border-emerald-400"
                  />
                </div>

                <div className="w-full md:mr-1">
                  <label htmlFor="minimumDonation">
                    <InfoMessage id="campaign_minimum_donation" />
                  </label>
                  <input
                    type="number"
                    id="minimumDonation"
                    value={minimumDonationValidation.value}
                    onChange={minimumDonationValidation.handleChange}
                    className="w-full px-4 py-3 my-2 block text-sm shadow-sm rounded-lg text-info border input-primary focus:outline-none hover:border-emerald-400"
                  />
                </div>
              </div>
              {economicTargetValidation.error && (
                <p className="text-danger mb-2">
                  {economicTargetValidation.error}
                </p>
              )}
              {minimumDonationValidation.error && (
                <p className="text-danger mb-2">
                  {minimumDonationValidation.error}
                </p>
              )}

              <label htmlFor="description">
                <InfoMessage id="organization_description" />
              </label>
              <input
                type="hidden"
                id="description"
                value={description}
                className="focus:outline-none"
              />

              <TextEditor
                handleEditorChange={setDescription}
                className="my-2"
              />

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
