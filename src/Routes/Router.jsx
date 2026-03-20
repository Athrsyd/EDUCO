import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Kelas from '../Pages/Guru/Kelas'
import SettingMisi from '../Pages/Guru/SettingMisi'
import GameLeaderBoard from '../Pages/Siswa/GameLeaderBoard'
import GameMenu from '../Pages/Siswa/GameMenu'
import GameTutorial from '../Pages/Siswa/GameTutorial'
import Misi from '../Pages/Siswa/Misi'
import LandingPage from '../Pages/LandingPage/LandingPage'
import Auth from '../Pages/AuthPage/Login/Auth'
// import Register from '../Pages/AuthPage/Register/Register'
import CapaianMurid from '../Pages/Guru/CapaianMurid'
import CreateMisi from '../Pages/Guru/CreateMisi'
import DaftarMurid from '../Pages/Guru/DaftarMurid'
import EditMisi from '../Pages/Guru/EditMisi'
// import Kelas from '../Pages/Guru/Kelas'
import DashbordGuru from '../Pages/Guru/DashbordGuru'
import DashboardSiswa from '../Pages/Siswa/DashboardSiswa'
import TestingComponent from './TestingComponent'
 

const getUserRole = () => localStorage.getItem('userRole')

const ProtectedRoute = ({ allowedRole, children }) => {
  const userRole = getUserRole()

  if (!userRole) {
    return <Navigate to="/login" replace />
  }

  if (userRole !== allowedRole) {
    const fallbackPath = userRole === 'guru' ? '/guru/dashboard' : '/siswa/dashboard'
    return <Navigate to={fallbackPath} replace />
  }

  return children
}

const AuthOnlyWhenLoggedOut = ({ children }) => {
  const userRole = getUserRole()

  if (userRole === 'guru') {
    return <Navigate to="/guru/dashboard" replace />
  }

  if (userRole === 'siswa') {
    return <Navigate to="/siswa/dashboard" replace />
  }

  return children
}


const Router = () => {
  return (
    <Routes>
      {/* Testing Component */}
      <Route path="/testing" element={<TestingComponent />} />

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Page */}
        <Route path="/login" element={<AuthOnlyWhenLoggedOut><Auth /></AuthOnlyWhenLoggedOut>} />
        <Route path="/register" element={<AuthOnlyWhenLoggedOut><Auth isRegister={true} /></AuthOnlyWhenLoggedOut>} />

        {/* Siswa Pages */}
        <Route path="/siswa/dashboard" element={<ProtectedRoute allowedRole="siswa"><DashboardSiswa /></ProtectedRoute>} />
        <Route path="/siswa/game-leaderboard" element={<ProtectedRoute allowedRole="siswa"><GameLeaderBoard /></ProtectedRoute>} />
        <Route path="/siswa/game-menu" element={<ProtectedRoute allowedRole="siswa"><GameMenu /></ProtectedRoute>} />
        <Route path="/siswa/game-tutorial" element={<ProtectedRoute allowedRole="siswa"><GameTutorial /></ProtectedRoute>} />
        <Route path="/siswa/misi" element={<ProtectedRoute allowedRole="siswa"><Misi /></ProtectedRoute>} />

        {/* Guru Pages */}
        <Route path="/guru/dashboard" element={<ProtectedRoute allowedRole="guru"><DashbordGuru /></ProtectedRoute>} />
        <Route path="/guru/kelas" element={<ProtectedRoute allowedRole="guru"><Kelas /></ProtectedRoute>} />
        <Route path="/guru/setting-misi" element={<ProtectedRoute allowedRole="guru"><SettingMisi /></ProtectedRoute>} />
        <Route path="/guru/capaian-murid" element={<ProtectedRoute allowedRole="guru"><CapaianMurid /></ProtectedRoute>} />
        <Route path="/guru/create-misi" element={<ProtectedRoute allowedRole="guru"><CreateMisi /></ProtectedRoute>} />
        <Route path="/guru/daftar-murid" element={<ProtectedRoute allowedRole="guru"><DaftarMurid /></ProtectedRoute>} />
        <Route path="/guru/edit-misi/:id" element={<ProtectedRoute allowedRole="guru"><EditMisi /></ProtectedRoute>} />
        {/* <Route path="/guru/"/> */}
      </Routes>
  )
}

export default Router