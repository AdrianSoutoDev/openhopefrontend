import React from 'react'
import NavBar from './NavBar'
import AppRoutes from '../../AppRoutes'

const Layout = () => {
  return (
    <div className="md:px-16 mb-10">
      <NavBar />
      <AppRoutes />
    </div>
  )
}

export default Layout
