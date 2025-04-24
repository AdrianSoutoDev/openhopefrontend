import React, { useContext } from 'react'
import ErrorContext from '../../context/ErrorContext'

const ErrorMessage = () => {
  const { errors, hideErrors } = useContext(ErrorContext)

  if (!errors || !errors.length) return null

  return (
    <div className="flex justify-center">
      <div
        className="text-wrap fixed top-0 bg-danger m-2 rounded-lg p-2 text-danger-dark z-1000"
        onClick={hideErrors}
      >
        <ul className="list-disc bg-danger px-6">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ErrorMessage
