import { useState } from 'react'
import { Button } from '../components/shared/Buttons'
import PageTitle from '../components/shared/PageTitle'
import { InfoMessage, Message } from '../components/shared/Messages'
import MultipleSelector from '../components/shared/MultipleSelector'
import useValidation from '../hooks/useValidation'
import useRegister from '../hooks/useRegister'
import { FormattedMessage } from 'react-intl'
import EmailPasswordForm from '../components/shared/EmailPasswordForm'
import Spinner from '../components/shared/Spinner'
import TextEditor from '../components/shared/TextEditor'

function Register() {
  const [typeAccount, setTypeAccount] = useState('')
  const [moreInfoEnabled, setMoreInfoEnable] = useState(false)
  const { register, loading } = useRegister()
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [categoriesSelected, setCategoriesSelected] = useState([])

  const categoriesSource = {
    endpoint: '/categories',
    options: { method: 'GET' },
  }

  const emailValidation = useValidation('', {
    required: true,
    format: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
    messages: {
      required: <FormattedMessage id="email_error_empty" />,
      format: <FormattedMessage id="email_error_format" />,
    },
  })

  const passwordValidation = useValidation('', {
    required: true,
    messages: {
      required: <FormattedMessage id="password_error_empty" />,
    },
  })

  const nameValidation = useValidation('', {
    required: true,
    messages: {
      required: <FormattedMessage id="name_error_empty" />,
    },
  })

  const showMoreInfo = () => {
    setMoreInfoEnable(true)
  }

  const handleEditorChange = (text) => {
    setDescription(text)
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isEmailValid = emailValidation.validate()
    const isPasswordValid = passwordValidation.validate()
    const isNameValid = nameValidation.validate()

    if (typeAccount === 'user') {
      if (isEmailValid && isPasswordValid) {
        register(
          emailValidation.value,
          passwordValidation.value,
          null,
          null,
          null,
          null,
          typeAccount,
        )
      }
    }

    if (typeAccount === 'organization') {
      if (isEmailValid && isPasswordValid && isNameValid) {
        register(
          emailValidation.value,
          passwordValidation.value,
          nameValidation.value,
          description,
          categoriesSelected,
          image,
          typeAccount,
        )
      }
    }
  }

  return (
    <>
      <PageTitle />
      <div className="flex flex-col justify-center items-center">
        <div className="p-4 max-w-96 md:max-w-2xl">
          {!typeAccount && (
            <div className="flex flex-col md:flex-row justify-center items-center h-96 text-center">
              <div className="flex flex-col my-4 justify-center items-center p-2 max-w-96 md:mx-2">
                <InfoMessage id="info_register_user" />

                <Button
                  className="w-min-28 w-64 my-4"
                  onClick={() => setTypeAccount('user')}
                >
                  <Message id="create_user_account" />
                </Button>
              </div>

              <div className="flex flex-col my-4 justify-center items-center p-2 max-w-96 md:mx-2">
                <p>
                  <InfoMessage id="info_register_organization" />
                </p>

                <Button
                  className="w-min-28 w-64 my-4"
                  onClick={() => setTypeAccount('organization')}
                >
                  <Message id="create_organization" />
                </Button>
              </div>
            </div>
          )}

          {typeAccount && (
            <div className="flex flex-col justify-center items-center">
              <form onSubmit={handleSubmit}>
                <EmailPasswordForm
                  emailValidation={emailValidation}
                  passwordValidation={passwordValidation}
                />

                {typeAccount === 'organization' && (
                  <>
                    <label htmlFor="name">
                      <InfoMessage id="organization_name" />
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={nameValidation.value}
                      onChange={nameValidation.handleChange}
                      required
                      onInvalid={nameValidation.onInvalid}
                      className="text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2 focus:outline-none"
                    />
                    {nameValidation.error && (
                      <p className="text-danger mb-2">{nameValidation.error}</p>
                    )}

                    {moreInfoEnabled && (
                      <>
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
                        />
                      </>
                    )}
                  </>
                )}

                <div className="md:flex">
                  {typeAccount === 'organization' && (
                    <Button
                      type="button"
                      onClick={showMoreInfo}
                      disabled={moreInfoEnabled}
                      className="w-full md:w-1/2 my-2 md:mr-2"
                    >
                      <FormattedMessage id="add_more_info" />
                    </Button>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full my-2 ${typeAccount === 'organization' && 'md:ml-2'}`}
                  >
                    {loading && <Spinner />}
                    {!loading && (
                      <>
                        {typeAccount === 'organization' ? (
                          <FormattedMessage id="create_organization" />
                        ) : (
                          <FormattedMessage id="signup" />
                        )}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Register
