import { useNavigate } from 'react-router-dom'
import PageTransition from '../../Components/PageTransition'
import dataIcon from '../../assets/Data/icon'

const GameMenu = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    navigate('/')
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-[#EDEAE4] flex flex-col pt-16">
      {/* ========== TOP NAVBAR (FIXED) ========== */}
      <nav className="fixed top-0 left-0 right-0 h-16 w-full bg-[#EDEAE4] px-4 flex items-center justify-between z-50 shadow-sm">
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-black/5 transition-colors touch-target flex items-center justify-center"
            onClick={() => navigate('/')}
          >
            {dataIcon({ size: 22, color: '#48A111' }).graduationCap}
          </button>
        </div>
        <div className="flex items-center gap-1">
          <span>{dataIcon({ size: 18, color: '#48A111' }).treePine}</span>
          <span className="text-lg md:text-2xl font-bold text-neutral-600">99</span>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* ========== SIDEBAR (Desktop) ========== */}
        <aside
          className="hidden md:flex flex-col items-center pt-4 gap-6"
          style={{
            width: "64px",
            minWidth: "64px",
            backgroundColor: "#EDEAE4",
            height: "calc(100vh - 64px)",
          }}
        >
          <div
            className="w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-150"
            onClick={() => navigate('/siswa/dashboard')}
          >
            {dataIcon({ size: 20, color: "#48A111" }).graduationCap}
          </div>
          <div
            className="w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-150"
            onClick={() => navigate('/siswa/misi')}
          >
            {dataIcon({ size: 20, color: "#48A111" }).listTodo}
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: "#48A111" }}
          >
            <div style={{ color: "#F7F0F0" }}>
              {dataIcon({ size: 20, color: "#F7F0F0" }).gamepad}
            </div>
          </div>
          <div
            className="mt-auto mb-6 w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-150"
            onClick={handleLogout}
          >
            {dataIcon({ size: 20, color: "#48A111" }).logout}
          </div>
        </aside>

        {/* ========== MAIN CONTENT ========== */}
        <main className="flex-1 px-4 py-6 pb-24 md:pb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-secondary text-center mb-8">Game Menu</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto px-4">
            <button
              className="rounded-2xl bg-primary p-6 text-white font-semibold text-lg hover:scale-105 transition-transform touch-target"
              onClick={() => navigate('/siswa/game-tutorial')}
            >
              🎮 Tutorial Game
            </button>
            <button
              className="rounded-2xl bg-accent p-6 text-secondary font-semibold text-lg hover:scale-105 transition-transform touch-target"
              onClick={() => navigate('/siswa/game-leaderboard')}
            >
              🏆 Leaderboard
            </button>
          </div>
        </main>
      </div>

      {/* ========== MOBILE BOTTOM NAV (FIXED) ========== */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around py-2"
        style={{
          backgroundColor: "#EDEAE4",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          zIndex: 50,
        }}
      >
        <div
          className="w-11 h-11 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all duration-150 touch-target"
          onClick={() => navigate('/siswa/dashboard')}
        >
          {dataIcon({ size: 22, color: "#48A111" }).graduationCap}
        </div>

        <div
          className="w-11 h-11 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all duration-150 touch-target"
          onClick={() => navigate('/siswa/misi')}
        >
          {dataIcon({ size: 22, color: "#48A111" }).list}
        </div>

        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer touch-target"
          style={{ backgroundColor: "#48A111" }}
        >
          <div style={{ color: "#F7F0F0" }}>
            {dataIcon({ size: 22, color: "#F7F0F0" }).gamepad}
          </div>
        </div>

        <div
          className="w-11 h-11 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all duration-150 touch-target"
          onClick={handleLogout}
        >
          {dataIcon({ size: 22, color: "#48A111" }).logOut}
        </div>
      </nav>
    </div>
    </PageTransition>
  )
}

export default GameMenu
