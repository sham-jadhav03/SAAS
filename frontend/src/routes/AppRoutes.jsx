import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Project from '../pages/project'
import UserAuth from '../auth/UserAuth'


const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/project' element={<UserAuth><Project /></UserAuth>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes