import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import Sidebar from '../../Components/Sidebar'
import dataIcon from '../../assets/Data/icon'
import dataMisi from '../../assets/Data/Mode Siswa/dataMisi'
import dataStatistik from '../../assets/Data/Mode Siswa/dataStatistik'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const Misi = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('belum')
}
  const handleLogout = () => {
    localStorage.removeItem('userRole')
    navigate('/')
  }

  const statistikBulanan = useMemo(
    () => dataStatistik.slice(-7).map((item) => ({
      ...item,
      rasio: item.data.misiDitugaskan > 0
        ? (item.data.misiSelesai / item.data.misiDitugaskan) * 100
        : 0,
    })),
    []
  )

  const chartData = useMemo(() => ({
    labels: statistikBulanan.map((item) => item.bulan.slice(0, 3)),
    datasets: [
      {
        label: 'Capaian misi (%)',
        data: statistikBulanan.map((item) => Math.round(item.rasio)),
        backgroundColor: '#F2B50B',
        borderRadius: 10,
        borderSkipped: false,
        barPercentage: 0.72,
        categoryPercentage: 0.9,
      },
    ],
  }), [statistikBulanan])

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}% selesai`,
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false, drawBorder: false },
      },
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        display: false,
        grid: { display: false, drawBorder: false },
      },
    },
  }), [])

  const misiDenganStatus = useMemo(
    () => dataMisi.map((item) => ({
      ...item,
      selesai: item.pengerjaan >= item.target,
      persen: item.target > 0 ? Math.min(100, Math.round((item.pengerjaan / item.target) * 100)) : 0,
    })),
    []
  )

  const daftarMisi = useMemo(() => {
    if (filter === 'selesai') {
      return misiDenganStatus.filter((item) => item.selesai)
    }
    return misiDenganStatus.filter((item) => !item.selesai)
  }, [filter, misiDenganStatus])

  const progresHarian = useMemo(() => {
    const totalTarget = misiDenganStatus.reduce((sum, item) => sum + item.target, 0)
    const totalPengerjaan = misiDenganStatus.reduce((sum, item) => sum + item.pengerjaan, 0)
    if (totalTarget === 0) return 0
    return Math.min(100, Math.round((totalPengerjaan / totalTarget) * 100))
  }, [misiDenganStatus])

  return (
    <div className="min-h-screen bg-[#efeaec] text-secondary">
      <nav className="h-16 w-full bg-[#e8e3dc] px-5 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button type="button" className="text-primary">
            {dataIcon({ size: 24, color: '#2B7A1F' }).menu}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>{dataIcon({ size: 22, color: '#4A4A4A' }).treePine}</span>
          <span className="text-3xl font-bold text-neutral-600">99</span>
        </div>
      </nav>

      <div className="flex">
        <Sidebar
          handleLogout={handleLogout}
          icon1={dataIcon({ size: 20, color: '#48A111' }).graduationCap}
          icon2={dataIcon({ size: 20, color: '#48A111' }).listTodo}
          icon3={dataIcon({ size: 20, color: '#48A111' }).gamepad}
          icon4={dataIcon({ size: 20, color: '#48A111' }).logout}
          link1="/siswa/dashboard"
          link2="/siswa/misi"
          link3="/siswa/game-menu"
        />

        {/* ========== MAIN CONTENT ========== */}
        {/* Tambahkan pb-28 di mobile agar konten bawah tidak tertutup navbar fixed */}
        <main className="flex-1 px-4 py-6 pb-28 md:pb-6 md:px-8 ml-0 md:ml-20">
          <section className="rounded-[30px] bg-[#7bbb4f] px-6 py-7 md:px-10 md:py-9">
            <h2 className="text-last text-[clamp(1.5rem,2vw,2rem)] font-bold">Statistik capaian misi anda</h2>
            <div className="mt-7 h-44 md:h-52">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </section>

          <section className="mt-7">
            <h3 className="text-4xl md:text-5xl font-bold text-secondary">Misi anda</h3>

            <div className="mt-6 flex flex-wrap items-center gap-3 md:gap-5">
              <button
                type="button"
                onClick={() => setFilter('belum')}
                className={`rounded-full px-6 py-3 text-xl font-semibold border transition-all duration-200 ${
                  filter === 'belum'
                    ? 'bg-linear-to-b from-[#2f811f] to-[#1e5f14] text-last border-transparent'
                    : 'bg-transparent text-primary border-primary'
                }`}
              >
                Yang belum terselesaikan
              </button>
              <button
                type="button"
                onClick={() => setFilter('selesai')}
                className={`rounded-full px-6 py-3 text-xl font-semibold border transition-all duration-200 ${
                  filter === 'selesai'
                    ? 'bg-linear-to-b from-[#2f811f] to-[#1e5f14] text-last border-transparent'
                    : 'bg-transparent text-primary border-primary'
                }`}
              >
                Sudah terselesaikan
              </button>
            </div>

            <div className="mt-6 text-center">
              <h4 className="text-3xl md:text-4xl font-bold text-secondary">Progres hari ini :</h4>
              <div className="mx-auto mt-3 flex max-w-3xl items-center gap-4 px-2">
                <div className="h-4 flex-1 rounded-full bg-zinc-200">
                  <div
                    className="h-full rounded-full bg-lime-500 transition-all duration-500"
                    style={{ width: `${progresHarian}%` }}
                  />
                </div>
                <span className="text-3xl font-extrabold text-primary">{progresHarian}%</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {daftarMisi.length === 0 && (
                <div className="md:col-span-2 rounded-2xl border border-primary/30 bg-white/70 p-6 text-center text-xl font-semibold text-secondary">
                  Belum ada misi pada kategori ini.
                </div>
              )}

              {daftarMisi.map((item) => (
                <article key={item.id} className="rounded-[20px] bg-secondary px-6 py-5 text-center text-last shadow-lg">
                  <p className="text-2xl font-semibold text-accent">{item.namaKelas}</p>
                  <h5 className="mt-1 text-3xl font-bold leading-tight">{item.namaMisi}</h5>

                  <div className="mt-5 h-2.5 rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${item.persen}%` }}
                    />
                  </div>

                  <p className="mt-2 text-lg font-medium text-white/90">
                    {item.pengerjaan}/{item.target} tugas
                  </p>

                  <button
                    type="button"
                    className="mt-5 rounded-full bg-last px-6 py-2 text-xl font-bold text-secondary hover:scale-[1.03] transition-transform"
                  >
                    Baca Petunjuk
                  </button>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* ========== MOBILE BOTTOM NAV ========== */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around py-3"
        style={{
          backgroundColor: "#e8e3dc",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          zIndex: 50,
        }}
      >
        {/* Dashboard (Inactive) */}
        <div 
          className="w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all duration-150"
          onClick={() => navigate('/siswa/dashboard')}
        >
          {dataIcon({ size: 20, color: "#48A111" }).graduationCap}
        </div>

        {/* Misi (Active) */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: "#48A111" }}
        >
          <div style={{ color: "#F7F0F0" }}>
            {dataIcon({ size: 20, color: "#F7F0F0" }).list}
          </div>
        </div>

        {/* Gamepad (Inactive) */}
        <div 
          className="w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all duration-150"
          onClick={() => navigate('/siswa/game-menu')}
        >
          {dataIcon({ size: 20, color: "#48A111" }).gamepad}
        </div>

        {/* LogOut */}
        <div 
          className="w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all duration-150"
          onClick={handleLogout}
        >
          {dataIcon({ size: 20, color: "#48A111" }).logOut}
        </div>
      </nav>
    </div>
  )