import React, { createContext, useState, useEffect, useRef } from 'react'
import { removeToken, setToken, getToken } from '../services/tokenService'
import { sendLogout, validateToken } from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [whoAmI, setWhoAmI] = useState('')
  const hasValidated = useRef(false)

  useEffect(() => {
    const validate = async () => {
      const token = getToken()
      if (token) {
        const res = await validateToken()
        if (res.status === 200) {
          const json = await res.json()
          setWhoAmI(json.email)
          setIsAuthenticated(true)
        } else {
          removeToken()
        }
      }
    }

    if (!hasValidated.current) validate()
    hasValidated.current = true
  }, [])

  const login = (token, email) => {
    setToken(token)
    setWhoAmI(email)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    sendLogout()
    removeToken()
    setIsAuthenticated(false)
    setWhoAmI('')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, whoAmI, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
