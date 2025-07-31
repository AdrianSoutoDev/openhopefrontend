import React, { createContext, useState, useEffect, useRef } from 'react'
import { removeToken, setToken, getToken } from '../services/tokenService'
import { sendLogout, validateToken } from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [whoAmI, setWhoAmI] = useState(null)
  const hasValidated = useRef(false)

  useEffect(() => {
    const validate = async () => {
      const token = getToken()
      if (token) {
        const res = await validateToken()
        if (res.status === 200) {
          const json = await res.json()
          setWhoAmI({ id: json.id, email: json.email, type: json.accountType })
        } else {
          removeToken()
        }
      }
    }

    if (!hasValidated.current) validate()
    hasValidated.current = true
  }, [])

  const login = (token, userData) => {
    setToken(token)
    setWhoAmI(userData)
  }

  const logout = async () => {
    sendLogout()
    removeToken()
    setWhoAmI(null)
  }

  const isAuthenticated = () => {
    return whoAmI !== null
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, whoAmI, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
