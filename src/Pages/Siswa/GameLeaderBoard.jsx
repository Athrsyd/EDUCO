import { useNavigate } from 'react-router-dom'
import PageTransition from '../../Components/PageTransition'
import dataIcon from '../../assets/Data/icon'

const GameLeaderBoard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    navigate('/')
  }

  // Dummy leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Ahmad', class: '10A', points: 2500 },
    { rank: 2, name: 'Budi', class: '10B', points: 2350 },
    { rank: 3, name: 'Citra', class: '10A', points: 2200 },
    { rank: 4, name: 'Dewi', class: '10C', points: 2100 },
    { rank: 5, name: 'Eko', class: '10B', points: 1950 },
    { rank: 6, name: 'Fajar', class: '10A', points: 1800 },
    { rank: 7, name: 'Gita', class: '10C', points: 1750 },
    { rank: 8, name: 'Hana', class: '10B', points: 1600 },
    { rank: 9, name: 'Indra', class: '10A', points: 1550 },
    { rank: 10, name: 'Joko', class: '10C', points: 1400 },
  ]

  const getRankColor = (rank) => {
    if (rank === 1) return 'bg-yellow-400'
    if (rank === 2) return 'bg-gray-300'
    if (rank === 3) return 'bg-amber-600'
    return 'bg-gray-200'
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
          <h1 className="text-2xl md:text-4xl font-bold text-secondary text-center mb-2">🏆 Leaderboard</h1>
          <p className="text-center text-xs md:text-base text-gray-600 mb-4 md:mb-6">Peringkat siswa berdasarkan poin misi</p>
          
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              {/* Header */}
              <div className="bg-primary text-white p-2 md:p-4 grid grid-cols-12 gap-1 md:gap-2 font-semibold text-xs md:text-base">
                <span className="col-span-1 text-center">#</span>
                <span className="col-span-6">Nama</span>
                <span className="col-span-2 text-center">Kls</span>
                <span className="col-span-3 text-right">Poin</span>
              </div>
              
              {/* Rows */}
              {leaderboardData.map((item) => (
                <div
                  key={item.rank}
                  className={`p-2 md:p-4 grid grid-cols-12 gap-1 md:gap-2 items-center text-xs md:text-base border-b border-gray-200 ${
                    item.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-transparent' : 'bg-white'
                  }`}
                >
                  <span className="col-span-1 flex justify-center">
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${getRankColor(item.rank)} flex items-center justify-center font-bold text-white text-xs`}>
                      {item.rank}
                    </div>
                  </span>
                  <span className="col-span-6 font-medium truncate">{item.name}</span>
                  <span className="col-span-2 text-center text-gray-600 text-xs">{item.class}</span>
                  <span className="col-span-3 text-right font-bold text-primary text-xs md:text-sm">{item.points.toLocaleString()}</span>
                </div>
              ))}
            </div>
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

export default GameLeaderBoard
