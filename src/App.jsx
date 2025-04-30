import React from 'react'
import './assets/styles/App.css'
import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from './context/AuthContext'
import { IntlProvider } from 'react-intl'
import { initI18n } from './services/i18nService'
import Layout from './components/shared/Layout'
import { ErrorProvider } from './context/ErrorContext'
import ErrorMessage from './components/shared/ErrorMessage'

function App() {
  
  const {locale, messages} = initI18n();

  return (
    <AuthProvider>
      <ErrorProvider>
        <Router>
          <IntlProvider locale={locale} messages={messages}>
            <ErrorMessage />
            <Layout />
          </IntlProvider>
        </Router>
      </ErrorProvider>
    </AuthProvider>
  )
}

export default App
