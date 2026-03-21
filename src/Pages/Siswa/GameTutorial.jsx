import { useNavigate } from 'react-router-dom'
import PageTransition from '../../Components/PageTransition'
import dataIcon from '../../assets/Data/icon'

const GameTutorial = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    navigate('/')
  }

  const tutorialSteps = [
    {
      step: 1,
      title: 'Selamat Datang!',
      description: 'Di game EDUJO, kamu akan belajar sambil bermain untuk menjaga lingkungan.',
      icon: '👋'
    },
    {
      step: 2,
      title: 'Terima Misi',
      description: 'Setiap hari kamu akan mendapatkan misi untuk menjaga lingkungan seperti daur ulang sampah atau menanam pohon.',
      icon: '📋'
    },
    {
      step: 3,
      title: 'Kerjakan Misi',
      description: 'Selesaikan misi yang diberikan dengan mengumpulkan poin sesuai target.',
      icon: '✅'
    },
    {
      step: 4,
      title: 'Dapatkan Poin',
      description: 'Setiap misi yang diselesaikan akan memberikan poin. Kumpulkan poin sebanyak-banyaknya!',
      icon: '⭐'
    },
    {
      step: 5,
      title: 'Naik Level',
      description: 'Dengan mengumpulkan poin, kamu akan naik level dan mendapatkan hadiah!',
      icon: '🎁'
    },
    {
      step: 6,
      title: 'Bersaing dengan Teman',
      description: 'Lihat peringkatmu di leaderboard dan bersaing dengan teman-temanmu!',
      icon: '🏆'
    }
  ]

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
          <h1 className="text-2xl md:text-4xl font-bold text-secondary text-center mb-2">🎮 Tutorial Game</h1>
          <p className="text-center text-xs md:text-base text-gray-600 mb-4 md:mb-6">Pelajari cara bermain EDUJO</p>
          
          <div className="max-w-2xl mx-auto space-y-3">
            {tutorialSteps.map((item, index) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-3 md:p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center text-xl md:text-3xl">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-accent text-secondary text-xs font-bold px-2 py-0.5 rounded-full">
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="text-base md:text-xl font-bold text-secondary mb-1">{item.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <button
              className="bg-primary text-white font-semibold py-2 md:py-3 px-6 md:px-8 rounded-full text-sm md:text-lg hover:scale-105 transition-transform touch-target"
              onClick={() => navigate('/siswa/game-menu')}
            >
              Mulai Bermain! 🎮
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

export default GameTutorial
