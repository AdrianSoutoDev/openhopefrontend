import React from 'react'
import NavBar from './components/navbar/NavBar.jsx'
import './assets/styles/App.css'
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './AppRoutes'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='md:px-16'>
          <NavBar />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
