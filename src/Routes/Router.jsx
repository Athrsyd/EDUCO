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
import CapaianMurid from '../Pages/Guru/CapaianMurid'
import CreateMisi from '../Pages/Guru/CreateMisi'
import DaftarMurid from '../Pages/Guru/DaftarMurid'
import EditMisi from '../Pages/Guru/EditMisi'
import DashbordGuru from '../Pages/Guru/DashbordGuru'
import DashboardSiswa from '../Pages/Siswa/DashboardSiswa'
import TestingComponent from './TestingComponent'
import Level1 from '../Pages/Siswa/level1'
import Level2 from '../Pages/Siswa/level2'
import Level3 from '../Pages/Siswa/level3'
import BuatKelas from '../Pages/Guru/BuatKelas'
import NotFound from '../Pages/NotFound'
 

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
        <Route path="/siswa/level1" element={<ProtectedRoute allowedRole="siswa"><Level1 /></ProtectedRoute>} />
        <Route path="/siswa/level2" element={<ProtectedRoute allowedRole="siswa"><Level2 /></ProtectedRoute>} />
        <Route path="/siswa/level3" element={<ProtectedRoute allowedRole="siswa"><Level3 /></ProtectedRoute>} />

        {/* Guru Pages */}
        <Route path="/guru/dashboard" element={<ProtectedRoute allowedRole="guru"><DashbordGuru /></ProtectedRoute>} />
        <Route path="/guru/kelas" element={<ProtectedRoute allowedRole="guru"><Kelas /></ProtectedRoute>} />
        <Route path="/guru/setting-misi" element={<ProtectedRoute allowedRole="guru"><SettingMisi /></ProtectedRoute>} />
        <Route path="/guru/capaian-murid" element={<ProtectedRoute allowedRole="guru"><CapaianMurid /></ProtectedRoute>} />
        <Route path="/guru/create-misi" element={<ProtectedRoute allowedRole="guru"><CreateMisi /></ProtectedRoute>} />
        <Route path="/guru/daftar-murid" element={<ProtectedRoute allowedRole="guru"><DaftarMurid /></ProtectedRoute>} />
        <Route path="/guru/edit-misi/:id" element={<ProtectedRoute allowedRole="guru"><EditMisi /></ProtectedRoute>} />
        <Route path="/guru/buat-kelas" element={<ProtectedRoute allowedRole="guru"><BuatKelas /></ProtectedRoute>} />
        {/* <Route path="/guru/"/> */}

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default Router