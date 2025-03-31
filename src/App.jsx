import React from 'react'
import NavBar from './components/navbar/NavBar.jsx'
import './assets/styles/App.css'
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from './AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { IntlProvider } from 'react-intl'
import { initI18n } from './services/i18nService.js'

function App() {
  
  const {locale, messages} = initI18n();

  return (
    <AuthProvider>
      <Router>
        <IntlProvider locale={locale} messages={messages}>
          <div className='md:px-16'>
            <NavBar />
            <AppRoutes />
          </div>
        </IntlProvider>
      </Router>
    </AuthProvider>
  )
}

export default App
