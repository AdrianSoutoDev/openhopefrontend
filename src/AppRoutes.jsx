import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import OrganizationDetail from './pages/organization/OrganizationDetail.jsx'
import OrganizationEdit from './pages/organization/OrganizationEdit.jsx'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/organization/:id" element={<OrganizationDetail />} />
    <Route path="/organization/:id/edit" element={<OrganizationEdit />} />
  </Routes>
)

export default AppRoutes
