import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../../Components/PageTransition'
import Sidebar from '../../Components/Sidebar'
import dataIcon from '../../assets/Data/icon'

const GameMenu = () => {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [scores, setScores] = useState({ level1: 0, level2: 0, level3: 0, total: 0 })
  const [category, setCategory] = useState({ name: '', color: '', description: '' })

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    navigate('/')
  }

  // Load scores from localStorage
  useEffect(() => {
    setMounted(true)
    const loadScores = () => {
      const l1 = parseInt(localStorage.getItem('level1_score') || '0', 10)
      const l2 = parseInt(localStorage.getItem('score2') || '0', 10)
      const l3 = parseInt(localStorage.getItem('score3') || '0', 10)
      
      // Normalize scores to max 100 each
      // Level 1: max 300 → normalize to 100
      // Level 2: max ~60 → normalize to 100
      // Level 3: varies → normalize to 100
      const norm1 = Math.min(100, Math.round((l1 / 300) * 100))
      const norm2 = Math.min(100, Math.round((l2 / 60) * 100))
      const norm3 = Math.min(100, Math.round((l3 / 250) * 100))
      
      // Calculate average (max 100)
      const total = Math.round((norm1 + norm2 + norm3) / 3)
      
      setScores({ level1: norm1, level2: norm2, level3: norm3, total })
      
      // Determine category
      if (total <= 40) {
        setCategory({
          name: 'Kota Tercemar',
          color: '#ef4444',
          description: 'Lingkungan membutuhkan perbaikan segera!'
        })
      } else if (total <= 70) {
        setCategory({
          name: 'Kota Berkembang',
          color: '#F2B50B',
          description: 'Progress bagus, terus tingkatkan!'
        })
      } else {
        setCategory({
          name: 'Kota Hijau',
          color: '#48A111',
          description: 'Luar biasa! Lingkungan yang ideal!'
        })
      }
    }
    
    loadScores()
    const interval = setInterval(loadScores, 1000)
    return () => clearInterval(interval)
  }, [])

  const getLevelStatus = (score) => {
    if (score === 0) return { text: 'Belum Dimainkan', color: '#94a3b8' }
    if (score < 40) return { text: 'Perlu Perbaikan', color: '#ef4444' }
    if (score < 70) return { text: 'Baik', color: '#F2B50B' }
    return { text: 'Sempurna!', color: '#48A111' }
  }

  return (
    <PageTransition>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .anim-fadein { opacity: 0; animation: fadeUp 0.5s ease-out forwards; }
        .delay-0 { animation-delay: 0ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-450 { animation-delay: 450ms; }
      `}</style>
      
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
          <Sidebar
            handleLogout={handleLogout}
            icon1={dataIcon({ size: 20, color: "#48A111" }).graduationCap}
            icon2={dataIcon({ size: 20, color: "#48A111" }).listTodo}
            icon3={dataIcon({ size: 20, color: "#48A111" }).gamepad}
            icon4={dataIcon({ size: 20, color: "#48A111" }).logout}
            link1="/siswa/dashboard"
            link2="/siswa/misi"
            link3="/siswa/game-menu"
          />

          {/* ========== MAIN CONTENT ========== */}
          <main className="flex-1 px-4 py-6 pb-24 md:pb-6 overflow-y-auto">
            {/* Header */}
            <h1 className={`text-2xl md:text-4xl font-bold text-center mb-2 ${mounted ? 'anim-fadein delay-0' : 'opacity-0'}`} style={{ color: "#25671E" }}>
              Arena Permainan
            </h1>
            <p className={`text-center text-sm md:text-base mb-6 ${mounted ? 'anim-fadein delay-150' : 'opacity-0'}`} style={{ color: "#64748b" }}>
              Pilih game dan kumpulkan EcoScore tertinggi!
            </p>

            {/* EcoScore Total Card */}
            <div className={`max-w-md mx-auto mb-8 ${mounted ? 'anim-fadein delay-300' : 'opacity-0'}`}>
              <div className="rounded-3xl overflow-hidden shadow-lg" style={{ background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)` }}>
                <div className="p-6 text-center text-white">
                  <div className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">EcoScore Total</div>
                  <div className="text-6xl md:text-7xl font-black mb-2" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                    {scores.total}
                  </div>
                  <div className="text-lg md:text-xl font-bold mb-1" style={{ color: category.color === '#ef4444' ? '#fecaca' : category.color === '#F2B50B' ? '#fef3c7' : '#dcfce7' }}>
                    {category.name}
                  </div>
                  <div className="text-xs opacity-75">{category.description}</div>
                  
                  {/* Progress bar to next category */}
                  {scores.total < 100 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1 opacity-75">
                        <span>Progress</span>
                        <span>{scores.total}/100</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{ width: `${scores.total}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Category Info Cards */}
            <div className={`max-w-md mx-auto mb-8 grid grid-cols-3 gap-2 ${mounted ? 'anim-fadein delay-450' : 'opacity-0'}`}>
              <div className="rounded-xl p-3 text-center" style={{ background: scores.total <= 40 ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.5)', border: scores.total <= 40 ? '2px solid #ef4444' : '2px solid transparent' }}>
                <div className="text-2xl mb-1">🏭</div>
                <div className="text-[10px] font-bold" style={{ color: '#ef4444' }}>0-40</div>
                <div className="text-[9px]" style={{ color: '#64748b' }}>Tercemar</div>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ background: scores.total > 40 && scores.total <= 70 ? 'rgba(242,181,11,0.15)' : 'rgba(255,255,255,0.5)', border: scores.total > 40 && scores.total <= 70 ? '2px solid #F2B50B' : '2px solid transparent' }}>
                <div className="text-2xl mb-1">🏗️</div>
                <div className="text-[10px] font-bold" style={{ color: '#F2B50B' }}>41-70</div>
                <div className="text-[9px]" style={{ color: '#64748b' }}>Berkembang</div>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ background: scores.total > 70 ? 'rgba(72,161,17,0.15)' : 'rgba(255,255,255,0.5)', border: scores.total > 70 ? '2px solid #48A111' : '2px solid transparent' }}>
                <div className="text-2xl mb-1">🌳</div>
                <div className="text-[10px] font-bold" style={{ color: '#48A111' }}>71-100</div>
                <div className="text-[9px]" style={{ color: '#64748b' }}>Hijau</div>
              </div>
            </div>

            {/* Game Cards */}
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Level 1 */}
              <button
                onClick={() => navigate('/siswa/level1')}
                className="w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-left"
              >
                <div className="flex" style={{ background: 'linear-gradient(135deg, #48A111 0%, #25671E 100%)' }}>
                  <div className="p-5 text-white flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-lg">Level 1: Pilah Sampah</h3>
                        <p className="text-xs opacity-80">Drag & drop sampah ke tempat yang benar</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-xs">
                        <span>75 detik</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span>30 item</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span>Max 300 pts</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-24 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="text-center">
                      <div className="text-3xl font-black">{scores.level1}</div>
                      <div className="text-xs opacity-75">/ 100</div>
                      <div className="text-[10px] mt-1" style={{ color: getLevelStatus(scores.level1).color }}>
                        {getLevelStatus(scores.level1).text}
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Level 2 */}
              <button
                onClick={() => navigate('/siswa/level2')}
                className="w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-left"
              >
                <div className="flex" style={{ background: 'linear-gradient(135deg, #F2B50B 0%, #B8860B 100%)' }}>
                  <div className="p-5 text-white flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-lg">Level 2: EcoMission</h3>
                        <p className="text-xs opacity-80">Jawab quiz kebijakan lingkungan</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-xs">
                        <span>90 detik</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span>6 soal</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span>Max +60 pts</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-24 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="text-center">
                      <div className="text-3xl font-black">{scores.level2}</div>
                      <div className="text-xs opacity-75">/ 100</div>
                      <div className="text-[10px] mt-1" style={{ color: getLevelStatus(scores.level2).color }}>
                        {getLevelStatus(scores.level2).text}
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Level 3 */}
              <button
                onClick={() => navigate('/siswa/level3')}
                className="w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-left"
              >
                <div className="flex" style={{ background: 'linear-gradient(135deg, #25671E 0%, #1a4a1a 100%)' }}>
                  <div className="p-5 text-white flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-lg">Level 3: Kepala Daerah</h3>
                        <p className="text-xs opacity-80">Keputusan strategis untuk kota</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-xs">
                        <span>120 detik</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span>5 kasus</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span>Variable</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-24 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="text-center">
                      <div className="text-3xl font-black">{scores.level3}</div>
                      <div className="text-xs opacity-75">/ 100</div>
                      <div className="text-[10px] mt-1" style={{ color: getLevelStatus(scores.level3).color }}>
                        {getLevelStatus(scores.level3).text}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Tutorial & Leaderboard */}
            <div className={`max-w-2xl mx-auto mt-8 grid grid-cols-2 gap-4 ${mounted ? 'anim-fadein delay-450' : 'opacity-0'}`}>
              <button
                className="rounded-2xl bg-white p-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
                onClick={() => navigate('/siswa/game-tutorial')}
              >
                <div className="font-bold text-sm" style={{ color: '#25671E' }}>Tutorial</div>
                <div className="text-xs" style={{ color: '#64748b' }}>Cara bermain</div>
              </button>
              <button
                className="rounded-2xl bg-white p-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
                onClick={() => navigate('/siswa/game-leaderboard')}
              >
                <div className="font-bold text-sm" style={{ color: '#25671E' }}>Leaderboard</div>
                <div className="text-xs" style={{ color: '#64748b' }}>Peringkat</div>
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
