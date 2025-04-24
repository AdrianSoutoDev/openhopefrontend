import { useState } from 'react'

const useValidation = (initialState, validations) => {
  const [value, setValue] = useState(initialState)
  const [error, setError] = useState('')

  const validate = () => {
    if (validations.required && !value) {
      setError(validations.messages?.required || 'This field is required.')
      return false
    }

    if (validations.minLength && value.length < validations.minLength) {
      setError(
        validations.messages?.minLength ||
          `Must be at least ${validations.minLength} characters long.`,
      )
      return false
    }

    if (validations.maxLength && value.length > validations.maxLength) {
      setError(
        validations.messages?.maxLength ||
          `Cannot exceed ${validations.maxLength} characters.`,
      )
      return false
    }

    if (validations.format && !validations.format.test(value)) {
      setError(validations.messages?.format || 'Invalid format.')
      return false
    }

    return true
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    setError('')
  }

  const onInvalid = (e) => {
    e.preventDefault()
    validate()
  }

  return { value, error, handleChange, validate, onInvalid }
}

export default useValidation
