import React, { createContext, useState } from 'react'
import { capitalize } from '../utils/utils'

const ErrorContext = createContext()

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([])
  const errorTimeout = 5000

  const showErrorTimeout = (_errors) => {
    setErrors(_errors)
    setTimeout(() => {
      setErrors([])
    }, errorTimeout)
  }

  const showErrors = (message) => {
    if (message && typeof message === 'string' && message.length) {
      showErrorTimeout(message)
    } else if (message && typeof message === 'object') {
      let _errors = []
      Object.values(message).forEach((value) => {
        if (value.length) {
          const capitalizedValue = capitalize(value)
          _errors.push(capitalizedValue)
        }
      })
      showErrorTimeout(_errors)
    }
  }

  const hideErrors = () => setErrors([])

  return (
    <ErrorContext.Provider value={{ errors, showErrors, hideErrors }}>
      {children}
    </ErrorContext.Provider>
  )
}

export default ErrorContext
