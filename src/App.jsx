import React from 'react'
import NavBar from './components/navbar/NavBar.jsx'
import './assets/styles/App.css'
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './AppRoutes'

function App() {
  return (
    <Router>
      <div className='md:px-16'>
        <NavBar />
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App
