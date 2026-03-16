// Dashboard.jsx
import { useState, useEffect } from "react";
import dataIcon from "../../assets/Data/icon";
import { data } from "react-router-dom";
import {Link, useNavigate} from 'react-router-dom'

export default function Dashboard({ username = "Budi", onBack }) {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('userRole');
  };

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setProgress(33), 400);
    return () => clearTimeout(timer);
  }, []);

  const classes = [
    { name: "Kelas lorem", teacher: "Pak Lorem Ipsum" },
    { name: "Kelas lorem", teacher: "Pak Lorem Ipsum" },
    { name: "Kelas lorem", teacher: "Pak Lorem Ipsum" },
  ];

  const missions = [
    {
      num: "01",
      title: "Membuang sampah pada tempatnya",
      class: "kelas lorem",
      progress: "1/5",
      completed: false,
    },
    {
      num: "02",
      title: "Membuang sampah pada tempatnya",
      class: "kelas lorem",
      progress: "1/5",
      completed: false,
    },
    {
      num: "03",
      title: "Membuang sampah pada tempatnya",
      class: "kelas lorem",
      progress: "5/5",
      completed: true,
    },
  ];


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

      <div className="min-h-screen bg-[#EDEAE4] flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {/* ========== TOP NAVBAR ========== */}
        <nav
          className="anim-fadein anim-delay-0 w-full flex items-center justify-between px-6"
          style={{ height: "64px", backgroundColor: "#EDEAE4" }}
        >
          {/* Left side */}
          <div className="flex items-center">
            {/* Back button - hanya muncul jika ada onBack */}
            {onBack && (
              <button
                onClick={onBack}
                className="mr-4 p-2 rounded-full hover:bg-black/5 transition-colors"
                title="Kembali"
              >
                <div className="rotate-180">
                  {dataIcon({ size: 20, color: "#48A111" }).arrowRight}
                </div>
              </button>
            )}
            <div className="mr-4 cursor-pointer">
              {dataIcon({ size: 20, color: "#48A111" }).menu}
            </div>
            <div className="flex items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="mr-0.5"
              >
                <path
                  d="M10 2C6 2 2 6 2 10s4 8 8 8 8-4 8-8-4-8-8-8zm0 3l5 5-5 5V5z"
                  fill="#48A111"
                />
              </svg>
              <span
                className="font-extrabold text-xl tracking-tight"
                style={{ color: "#1A1A1A" }}
              >
                DUCO
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {dataIcon({ size: 20, color: "#48A111" }).treePine}
            <span
              className="font-bold text-lg"
              style={{ color: "#1A1A1A" }}
            >
              99
            </span>
          </div>
        </nav>

        {/* ========== BODY: SIDEBAR + MAIN ========== */}
        <div className="flex flex-1">
          {/* ========== LEFT SIDEBAR (Desktop) ========== */}
          <aside
            className="hidden md:flex flex-col items-center pt-4 gap-6"
            style={{
              width: "64px",
              minWidth: "64px",
              backgroundColor: "#EDEAE4",
              height: "calc(100vh - 64px)",
            }}
          >
            {/* Active: Graduation Cap */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: "#48A111" }}
            >
              <div style={{ color: "#F7F0F0" }}>
                {dataIcon({ size: 20, color: "#F7F0F0" }).graduationCap}
              </div>
            </div>

            {/* Inactive: ListChecks */}
            <div className="w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-150">
              {dataIcon({ size: 20, color: "#48A111" }).list}
            </div>

            {/* Inactive: Gamepad2 */}
            <div className="w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-150">
              {dataIcon({ size: 20, color: "#48A111" }).gamepad}
            </div>

            {/* Logout at bottom */}
            <div onClick={handleLogout} className="mt-auto mb-6 w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-150">
              {dataIcon({ size: 20, color: "#48A111" }).logout}
            </div>
          </aside>

          {/* ========== MAIN CONTENT ========== */}
          <main className="flex-1 px-4 md:px-8 py-6 pb-28 md:pb-6" style={{ overflowX: "hidden" }}>
            {/* SECTION 1: Welcome Header */}
            <div
              className={`text-center mb-6 ${mounted ? "anim-fadein anim-delay-150" : "opacity-0"}`}
            >
              <h1
                className="font-bold text-xl md:text-3xl"
                style={{ color: "#48A111" }}
              >
                Selamat datang, {username}.
              </h1>
              <h2
                className="font-bold text-xl md:text-3xl"
                style={{ color: "#25671E" }}
              >
                Hari ini anda memiliki 3 misi menjaga lingkungan.
              </h2>
            </div>

            {/* SECTION 2: Progress Bar */}
            <div
              className={`flex items-center gap-4 mt-2 mb-8 ${mounted ? "anim-fadein anim-delay-300" : "opacity-0"}`}
            >
              <div
                className="flex-1 h-4 rounded-full"
                style={{ backgroundColor: "#D9D9D9" }}
              >
                <div
                  className="h-4 rounded-full"
                  style={{
                    backgroundColor: "#48A111",
                    width: `${progress}%`,
                    transition: "all 1000ms ease-out",
                  }}
                />
              </div>
              <span
                className="font-semibold text-sm ml-3"
                style={{ color: "#1A1A1A", minWidth: "32px" }}
              >
                {progress}%
              </span>
            </div>

            {/* SECTION 3: Kelas anda */}
            <div
              className={`${mounted ? "anim-fadein anim-delay-450" : "opacity-0"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="font-bold text-xl"
                  style={{ color: "#F2B50B" }}
                >
                  Kelas anda
                </h3>
                <span
                  className="text-2xl font-light cursor-pointer hover:scale-110 transition-transform duration-200 select-none"
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
                    className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
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
              <div className="flex md:hidden overflow-x-auto gap-4 hide-scrollbar">
                {classes.map((cls, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer shrink-0"
                    style={{ width: "192px" }}
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
            </div>

            {/* SECTION 4: Misi anda */}
            <div
              className={`mt-6 md:mt-8 ${mounted ? "anim-fadein anim-delay-600" : "opacity-0"}`}
            >
              <h3
                className="font-bold text-2xl md:text-4xl mb-4 md:mb-8"
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
                        className="flex items-center rounded-3xl overflow-hidden"
                        style={{ backgroundColor: "rgba(72,161,17,0.35)", minHeight: "64px" }}
                      >
                        {/* Number */}
                        <div
                          className="flex items-center justify-center flex-shrink-0"
                          style={{
                            width: "56px",
                            minWidth: "56px",
                          }}
                        >
                          <span
                            className="font-extrabold text-2xl"
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
                            height: "40px",
                            backgroundColor: "rgba(255,255,255,0.25)",
                          }}
                        />

                        {/* Text block */}
                        <div className="flex-1 min-w-0 px-3 py-2">
                          <p
                            className="font-bold text-sm leading-snug"
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
                          className="font-extrabold text-sm shrink-0 mr-2"
                          style={{ color: "rgba(247,240,240,0.5)", minWidth: "36px", textAlign: "right" }}
                        >
                          {mission.progress}
                        </span>

                        {/* Check icon */}
                        <div className="shrink-0 mr-3" style={{ color: "rgba(247,240,240,0.5)" }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
                      className="flex items-center rounded-3xl overflow-hidden hover:-translate-y-1 hover:brightness-110 transition-all duration-200 cursor-pointer"
                      style={{ backgroundColor: "#25671E", minHeight: "64px" }}
                    >
                      {/* Number */}
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          width: "56px",
                          minWidth: "56px",
                        }}
                      >
                        <span
                          className="font-extrabold text-2xl"
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
                          height: "40px",
                          backgroundColor: "rgba(255,255,255,0.25)",
                        }}
                      />

                      {/* Text block */}
                      <div className="flex-1 min-w-0 px-3 py-2">
                        <p
                          className="font-bold text-sm leading-snug"
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
                        className="font-extrabold text-sm flex-shrink-0 mr-2"
                        style={{ color: "#F7F0F0", minWidth: "36px", textAlign: "right" }}
                      >
                        {mission.progress}
                      </span>

                      {/* Arrow button */}
                      <div
                        className="flex items-center justify-center flex-shrink-0 mr-3 transition-colors duration-200"
                        style={{
                          backgroundColor: "#48A111",
                          width: "40px",
                          height: "40px",
                          minWidth: "40px",
                          borderRadius: "50%",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#25671E")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "#48A111")
                        }
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F7F0F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

        {/* ========== MOBILE BOTTOM NAV ========== */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around py-3"
          style={{
            backgroundColor: "#EDEAE4",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            zIndex: 50,
          }}
        >
          {/* Active: Graduation Cap */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: "#48A111" }}
          >
            <div style={{ color: "#F7F0F0" }}>
              {dataIcon({ size: 20, color: "#F7F0F0" }).graduationCap}
            </div>
          </div>

          {/* ListChecks */}
          <div className="w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all duration-150">
            {dataIcon({ size: 20, color: "#48A111" }).list}
          </div>

          {/* Gamepad2 */}
          <div className="w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all duration-150">
            {dataIcon({ size: 20, color: "#48A111" }).gamepad}
          </div>

          {/* LogOut */}
          <div className="w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-all duration-150">
            {dataIcon({ size: 20, color: "#48A111" }).logOut}
          </div>
        </nav>
      </div>
    </>
  );
}
