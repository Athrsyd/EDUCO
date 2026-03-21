// Dashboard.jsx
import { useState, useEffect } from "react";
import dataIcon from "../../assets/Data/icon";
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from "../../Components/Sidebar";
import Progress from "../../Components/Progress";
import PageTransition from "../../Components/PageTransition";
import dataListKelas from "../../assets/Data/Mode Siswa/dataListKelas";
import dataListMisi from "../../assets/Data/Mode Siswa/dataListMisi";


export default function Dashboard({ username = "Budi" }) {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setProgress(33), 400);
    return () => clearTimeout(timer);
  }, []);

  const classes = dataListKelas.map((item) => ({
    name: item.namaKelas,
    teacher: item.namaGuru,
  }));

  const missions = dataListMisi.map((item) => ({
    num: item.id,
    title: item.namaMisi,
    class: item.namaKelas,
    progress: `${item.misiSelesai}/${item.target}`,
    completed: item.selesai,
  }));



  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .anim-fadein {
          opacity: 0;
          animation: fadeUp 0.5s ease-out forwards;
        }

        .anim-delay-0 { animation-delay: 0ms; }
        .anim-delay-150 { animation-delay: 150ms; }
        .anim-delay-300 { animation-delay: 300ms; }
        .anim-delay-450 { animation-delay: 450ms; }
        .anim-delay-600 { animation-delay: 600ms; }

        * {
          font-family: 'Poppins', sans-serif;
        }

        /* Hide scrollbar for class cards horizontal scroll on mobile */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <PageTransition>
      <div className="min-h-screen bg-[#EDEAE4] flex flex-col pt-16" style={{ fontFamily: "'Poppins', sans-serif" }}>
        
        {/* ========== TOP NAVBAR (FIXED) ========== */}
        <nav
          className="fixed top-0 left-0 right-0 h-16 w-full bg-[#EDEAE4] px-4 md:px-6 flex items-center justify-between z-50 shadow-sm"
        >
          {/* Left side - HOME ICON */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="mr-2 md:mr-4 p-2 rounded-full hover:bg-black/5 transition-colors touch-target flex items-center justify-center"
              title="Home"
            >
              {dataIcon({ size: 22, color: "#48A111" }).graduationCap}
            </button>
          </div>

          {/* Right side - Tree counter */}
          <div className="flex items-center gap-1 md:gap-2">
            <span>{dataIcon({ size: 18, color: "#48A111" }).treePine}</span>
            <span className="text-lg md:text-2xl font-bold text-neutral-600">99</span>
          </div>
        </nav>

        {/* ========== BODY: SIDEBAR + MAIN ========== */}
        <div className="flex flex-1">
          {/* ========== LEFT SIDEBAR (Desktop) ========== */}
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
          <main className="flex-1 px-4 md:px-8 py-6 pb-24 md:pb-6" style={{ overflowX: "hidden" }}>
            {/* SECTION 1: Welcome Header */}
            <div
              className={`text-center mb-6 ${mounted ? "anim-fadein anim-delay-150" : "opacity-0"}`}
            >
              <h1
                className="font-bold text-lg md:text-3xl px-2"
                style={{ color: "#48A111" }}
              >
                Selamat datang, {username}.
              </h1>
              <h2
                className="font-bold text-sm md:text-3xl px-2 mt-1"
                style={{ color: "#25671E" }}
              >
                Hari ini anda memiliki 3 misi menjaga lingkungan.
              </h2>
            </div>


            {/* SECTION 2: Progress Bar */}
            <div
              className={`flex w-full px-4 md:px-10 items-center gap-2 md:gap-4 mt-2 mb-8 ${mounted ? "anim-fadein anim-delay-300" : "opacity-0"}`}
            >
              <Progress value={progress} max={100} />
            </div>

            {/* SECTION 3: Kelas anda */}
            <div
              className={`${mounted ? "anim-fadein anim-delay-450" : "opacity-0"}`}
            >
              <div className="flex items-center justify-between mb-4 px-2">
                <h3
                  className="font-bold text-lg md:text-xl"
                  style={{ color: "#F2B50B" }}
                >
                  Kelas anda
                </h3>
                <span
                  className="text-xl md:text-2xl font-light cursor-pointer hover:scale-110 transition-transform duration-200 select-none touch-target"
                  style={{ color: "#F2B50B" }}
                >
                  +
                </span>
              </div>

              {/* Desktop: 3 col grid | Mobile: horizontal scroll */}
              <div className="hidden md:grid grid-cols-3 gap-4">
                {classes.map((cls, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer touch-target"
                  >
                    <div
                      className="h-32"
                      style={{ backgroundColor: "#D9D9D9" }}
                    />
                    <div className="p-3" style={{ backgroundColor: "#F2B50B" }}>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "#F7F0F0" }}
                      >
                        {cls.name}
                      </p>
                      <p
                        className="font-normal text-xs"
                        style={{ color: "#F7F0F0", opacity: 0.9 }}
                      >
                        {cls.teacher}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile: horizontal scroll */}
              <div className="flex md:hidden overflow-x-auto gap-4 hide-scrollbar px-2">
                {classes.map((cls, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer shrink-0 touch-target"
                    style={{ width: "160px" }}
                  >
                    <div
                      className="h-24"
                      style={{ backgroundColor: "#D9D9D9" }}
                    />
                    <div className="p-3" style={{ backgroundColor: "#F2B50B" }}>
                      <p
                        className="font-semibold text-xs md:text-sm"
                        style={{ color: "#F7F0F0" }}
                      >
                        {cls.name}
                      </p>
                      <p
                        className="font-normal text-xs"
                        style={{ color: "#F7F0F0", opacity: 0.9 }}
                      >
                        {cls.teacher}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: Misi anda */}
            <div
              className={`mt-6 md:mt-8 ${mounted ? "anim-fadein anim-delay-600" : "opacity-0"}`}
            >
              <h3
                className="font-bold text-xl md:text-4xl mb-4 md:mb-8 px-2"
                style={{ color: "#1A1A1A" }}
              >
                Misi anda
              </h3>

              <div className="flex flex-col gap-3 md:gap-4">
                {missions.map((mission, i) => {
                  if (mission.completed) {
                    /* VARIANT B — COMPLETED */
                    return (
                      <div
                        key={i}
                        className="flex items-center rounded-3xl overflow-hidden touch-target"
                        style={{ backgroundColor: "rgba(72,161,17,0.35)", minHeight: "56px" }}
                      >
                        {/* Number */}
                        <div
                          className="flex items-center justify-center flex-shrink-0"
                          style={{
                            width: "44px",
                            minWidth: "44px",
                          }}
                        >
                          <span
                            className="font-extrabold text-lg md:text-2xl"
                            style={{
                              color: "rgba(247,240,240,0.5)",
                            }}
                          >
                            {mission.num}
                          </span>
                        </div>

                        {/* Divider */}
                        <div
                          className="shrink-0"
                          style={{
                            width: "2px",
                            height: "28px",
                            backgroundColor: "rgba(255,255,255,0.25)",
                          }}
                        />

                        {/* Text block */}
                        <div className="flex-1 min-w-0 px-2 py-2">
                          <p
                            className="font-bold text-xs md:text-sm leading-snug"
                            style={{ color: "rgba(247,240,240,0.5)" }}
                          >
                            {mission.title}
                          </p>
                          <p
                            className="font-semibold text-xs mt-0.5"
                            style={{ color: "#F2B50B", opacity: 0.6 }}
                          >
                            {mission.class}
                          </p>
                        </div>

                        {/* Progress */}
                        <span
                          className="font-extrabold text-xs md:text-sm shrink-0 mr-2"
                          style={{ color: "rgba(247,240,240,0.5)", minWidth: "32px", textAlign: "right" }}
                        >
                          {mission.progress}
                        </span>

                        {/* Check icon */}
                        <div className="shrink-0 mr-2 md:mr-3" style={{ color: "rgba(247,240,240,0.5)" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                    );
                  }

                  /* VARIANT A — INCOMPLETE */
                  return (
                    <div
                      key={i}
                      className="flex items-center rounded-3xl overflow-hidden hover:-translate-y-1 hover:brightness-110 transition-all duration-200 cursor-pointer touch-target"
                      style={{ backgroundColor: "#25671E", minHeight: "56px" }}
                    >
                      {/* Number */}
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          width: "44px",
                          minWidth: "44px",
                        }}
                      >
                        <span
                          className="font-extrabold text-lg md:text-2xl"
                          style={{
                            color: "#F7F0F0",
                          }}
                        >
                          {mission.num}
                        </span>
                      </div>

                      {/* Divider */}
                      <div
                        className="flex-shrink-0"
                        style={{
                          width: "2px",
                          height: "28px",
                          backgroundColor: "rgba(255,255,255,0.25)",
                        }}
                      />

                      {/* Text block */}
                      <div className="flex-1 min-w-0 px-2 py-2">
                        <p
                          className="font-bold text-xs md:text-sm leading-snug"
                          style={{ color: "#F7F0F0" }}
                        >
                          {mission.title}
                        </p>
                        <p
                          className="font-semibold text-xs mt-0.5"
                          style={{ color: "#F2B50B" }}
                        >
                          {mission.class}
                        </p>
                      </div>

                      {/* Progress */}
                      <span
                        className="font-extrabold text-xs md:text-sm flex-shrink-0 mr-2"
                        style={{ color: "#F7F0F0", minWidth: "32px", textAlign: "right" }}
                      >
                        {mission.progress}
                      </span>

                      {/* Arrow button */}
                      <div
                        className="flex items-center justify-center flex-shrink-0 mr-2 md:mr-3 transition-colors duration-200"
                        style={{
                          backgroundColor: "#48A111",
                          width: "32px",
                          height: "32px",
                          minWidth: "32px",
                          borderRadius: "50%",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#25671E")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "#48A111")
                        }
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F7F0F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>

        {/* ========== MOBILE BOTTOM NAV (FIXED) ========== */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around py-2 safe-area-pb"
          style={{
            backgroundColor: "#EDEAE4",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            zIndex: 50,
          }}
        >
          {/* Active: Graduation Cap (Dashboard) */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer touch-target"
            style={{ backgroundColor: "#48A111" }}
            onClick={() => navigate('/siswa/dashboard')}
          >
            <div style={{ color: "#F7F0F0" }}>
              {dataIcon({ size: 22, color: "#F7F0F0" }).graduationCap}
            </div>
          </div>

          {/* ListChecks (Misi) */}
          <div
            className="w-11 h-11 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all duration-150 touch-target"
            onClick={() => navigate('/siswa/misi')}
          >
            {dataIcon({ size: 22, color: "#48A111" }).list}
          </div>

          {/* Gamepad2 (Game) */}
          <div
            className="w-11 h-11 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all duration-150 touch-target"
            onClick={() => navigate('/siswa/game-menu')}
          >
            {dataIcon({ size: 22, color: "#48A111" }).gamepad}
          </div>

          {/* LogOut */}
          <div
            className="w-11 h-11 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all duration-150 touch-target"
            onClick={handleLogout}
          >
            {dataIcon({ size: 22, color: "#48A111" }).logOut}
          </div>
        </nav>
      </div>
      </PageTransition>
    </>
  );
}
