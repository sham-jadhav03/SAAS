import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from '../features/pages/project/Home'
import Login from '../features/pages/auth/Login'
import Register from '../features/pages/auth/Register'
import Project from '../features/pages/project/Project'
import UserAuth from '../features/hooks/UserAuth'


const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<UserAuth><Home /></UserAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/project' element={<UserAuth><Project /></UserAuth>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes