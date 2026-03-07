import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Kelas from '../Pages/Guru/Kelas'
import SettingMisi from '../Pages/Guru/SettingMisi'
import GameLeaderBoard from '../Pages/Siswa/GameLeaderBoard'
import GameMenu from '../Pages/Siswa/GameMenu'
import GameTutorial from '../Pages/Siswa/GameTutorial'
import Misi from '../Pages/Siswa/Misi'
import LandingPage from '../Pages/LandingPage/LandingPage'
import Login from '../Pages/AuthPage/Login/Login'
import Register from '../Pages/AuthPage/Register/Register'
import CapaianMurid from '../Pages/Guru/CapaianMurid'
import CreateMisi from '../Pages/Guru/CreateMisi'
import DaftarMurid from '../Pages/Guru/DaftarMurid'
import EditMisi from '../Pages/Guru/EditMisi'
// import Kelas from '../Pages/Guru/Kelas'
import SetingMisi from '../Pages/Guru/SettingMisi';
import DashbordGuru from '../Pages/Guru/DashbordGuru'
import DashboardSiswa from '../Pages/Siswa/DashboardSiswa'
import TestingComponent from './TestingComponent'
 

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Testing Component */}
        <Route path="/testing" element={<TestingComponent />} />

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Siswa Pages */}
        <Route path="/siswa/dashbord" element={<DashboardSiswa />} />
        <Route path="/siswa/game-leaderboard" element={<GameLeaderBoard />} />
        <Route path="/siswa/game-menu" element={<GameMenu />} />
        <Route path="/siswa/game-tutorial" element={<GameTutorial />} />
        <Route path="/siswa/misi" element={<Misi />} />

        {/* Guru Pages */}
        <Route path="/guru/dashbord" element={<DashbordGuru />} />
        <Route path="/guru/kelas" element={<Kelas />} />
        <Route path="/guru/setting-misi" element={<SettingMisi />} />
        <Route path="/guru/capaian-murid" element={<CapaianMurid />} />
        <Route path="/guru/create-misi" element={<CreateMisi />} />
        <Route path="/guru/daftar-murid" element={<DaftarMurid />} />
        <Route path="/guru/edit-misi/:id" element={<SetingMisi />} />
        {/* <Route path="/guru/"/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router