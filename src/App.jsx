import React from 'react'
import './assets/styles/App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { IntlProvider } from 'react-intl'
import { initI18n } from './services/i18nService'
import Layout from './components/shared/Layout'
import { ErrorProvider } from './context/ErrorContext'
import ErrorMessage from './components/shared/ErrorMessage'
import { GoBackProvider } from './context/GoBackContext'
import RestartGoBack from './context/RestartGoBack'

function App() {
  const { locale, messages } = initI18n()

  return (
    <AuthProvider>
      <ErrorProvider>
        <Router>
          <GoBackProvider>
            <RestartGoBack
              routesAvoidToGoBack={[
                '/organization/:id/edit',
                '/organization/:id/create-campaign',
              ]}
            />
            <IntlProvider locale={locale} messages={messages}>
              <ErrorMessage />
              <Layout />
            </IntlProvider>
          </GoBackProvider>
        </Router>
      </ErrorProvider>
    </AuthProvider>
  )
}

export default App
