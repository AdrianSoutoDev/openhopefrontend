import React, { createContext, useState } from 'react'

const GoBackContext = createContext()

export const GoBackProvider = ({ children }) => {
  const [showGoBack, setShowGoBack] = useState(false)
  const [whereWeGo, setWhereWeGo] = useState('/')

  const restart = () => {
    setShowGoBack(false)
    setWhereWeGo('/')
  }

  return (
    <GoBackContext.Provider
      value={{ showGoBack, whereWeGo, setShowGoBack, setWhereWeGo, restart }}
    >
      {children}
    </GoBackContext.Provider>
  )
}

export default GoBackContext
