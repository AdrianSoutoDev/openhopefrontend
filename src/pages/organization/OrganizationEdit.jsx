import { useParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import useValidation from '../../hooks/useValidation'
import { FormattedMessage } from 'react-intl'
import { InfoMessage } from '../../components/shared/Messages'
import MultipleSelector from '../../components/shared/MultipleSelector'
import TextEditor from '../../components/shared/TextEditor'
import { Button } from '../../components/shared/Buttons'
import useUpdateOrganization from '../../hooks/useUpdateOrganization'
import Spinner from '../../components/shared/Spinner'
import PageTitle from '../../components/shared/PageTitle'
import GoBackContext from '../../context/GoBackContext'

function OrganizationEdit() {
  const { id } = useParams()
  const [categoriesSelected, setCategoriesSelected] = useState([])
  const [description, setDescription] = useState('')
  const [initialDescription, setInitialDescription] = useState('')
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const { setShowGoBack, setWhereWeGo } = useContext(GoBackContext)

  const hasFetched = useRef(false)
  const { data, loading, fetch } = useFetch()
  const { update } = useUpdateOrganization(id)

  const nameValidation = useValidation(name, {
    required: true,
    messages: {
      required: <FormattedMessage id="name_error_empty" />,
    },
  })

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
      setName(data.name)
      setDescription(data.description)
      setInitialDescription(data.description)
      setCategoriesSelected(data.categories.map((item) => item.name))
    }
  }, [data])

  const categoriesSource = {
    endpoint: '/categories',
    options: { method: 'GET' },
  }

  const handleEditorChange = (text) => {
    setDescription(text)
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0])
    }
  }

  const handleChangeName = (e) => {
    nameValidation.handleChange(e)
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isNameValid = nameValidation.validate()
    if (isNameValid) {
      update(nameValidation.value, description, categoriesSelected, image)
    }
  }

  return (
    <>
      <PageTitle title={<FormattedMessage id="editing" />} className="mb-5" />

      {loading ? (
        <div className="h-128 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="p-4 max-w-96 md:max-w-2xl">
            <div className="flex flex-col justify-center items-center">
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                  <InfoMessage id="organization_name" />
                </label>
                <input
                  type="text"
                  id="email"
                  value={name}
                  onChange={handleChangeName}
                  required
                  onInvalid={nameValidation.onInvalid}
                  className="text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2 focus:outline-none"
                />
                {nameValidation.error && (
                  <p className="text-danger mb-2">{nameValidation.error}</p>
                )}

                <div className="md:flex">
                  <div className="w-full md:mr-1">
                    <label htmlFor="image">
                      <InfoMessage id="organization_profile_image" />
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
                      source={categoriesSource}
                      selectedItems={categoriesSelected}
                      setSelectedItems={setCategoriesSelected}
                      className="my-2"
                    />
                  </div>
                </div>

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
                  handleEditorChange={handleEditorChange}
                  className="my-2"
                  initialValue={initialDescription}
                />

                <div className="md:flex">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full my-2 md:ml-2"
                  >
                    {loading && <Spinner />}
                    {!loading && <FormattedMessage id="save_changes" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OrganizationEdit
