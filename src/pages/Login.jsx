import React, { useContext, useEffect } from 'react'
import useLogin from '../hooks/useLogin'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { FormattedMessage } from 'react-intl'
import { Button, ButtonLink } from '../components/shared/Buttons'
import useValidation from '../hooks/useValidation'
import PageTitle from '../components/shared/PageTitle'
import EmailPasswordForm from '../components/shared/EmailPasswordForm'
import Spinner from '../components/shared/Spinner'
import { SuccessMessage } from '../components/shared/Messages'

function Login() {
  const { isAuthenticated } = useContext(AuthContext)
  const { login, loading } = useLogin()
  const navigate = useNavigate()
  const location = useLocation()
  const registered = location.state?.registered
  const redirectUrl = location.state?.redirecturl

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const isEmailValid = emailValidation.validate()
    const isPasswordValid = passwordValidation.validate()

    if (isEmailValid && isPasswordValid) {
      login(emailValidation.value, passwordValidation.value)
    }
  }

  const handleRegisterButton = () => {
    if (redirectUrl) {
      navigate(`/register`, {
        state: { redirecturl: redirectUrl },
      })
    } else {
      navigate('/register')
    }
  }

  useEffect(() => {
    if (isAuthenticated()) {
      if (redirectUrl) {
        navigate(redirectUrl)
      } else {
        navigate('/')
      }
    }
  }, [isAuthenticated, navigate, redirectUrl])

  return (
    <>
      <PageTitle />
      <div className="flex h-96 justify-center items-center">
        <div className="flex flex-col items-end rounded-lg shadow-sm border border-secondary mx-2 max-w-96 h-fit p-4">
          {registered && (
            <SuccessMessage id="register_success" className="w-full mb-4" />
          )}

          <form onSubmit={handleSubmit}>
            <EmailPasswordForm
              emailValidation={emailValidation}
              passwordValidation={passwordValidation}
            />

            <Button type="submit" disabled={loading} className="w-full my-2">
              {loading ? <Spinner /> : <FormattedMessage id="signin" />}
            </Button>

            <Button
              type="button"
              onClick={handleRegisterButton}
              className="w-full my-2"
            >
              <FormattedMessage id="signup" />
            </Button>

            {location.state?.msg && (
              <p className="text-danger">
                {location.state?.msg.error || 'Invalid credentials'}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
