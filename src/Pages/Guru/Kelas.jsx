import React from "react";
import dataIcon from "/src/assets/Data/icon.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "/logo_Educo.svg";
export default function Dashboard() {
  const sebutan = "Pak";
  const username = "Kopling";

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate ("/");
    localStorage.removeItem ("userRole");
    
};

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">

      {/* SIDEBAR */}
      <div className="w-14 sm:w-16 md:w-20 bg-[#E7E3DE] flex flex-col items-center py-4 gap-6">

        <div
        onClick={() => navigate("/guru/dashboard")}
        className="opacity-60 hover:opacity-100 cursor-pointer"
        >
          {dataIcon({ size: 24, color: "#4CAF50" }).menu}
        </div>

        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center text-white">
          {dataIcon({ size: 18, color: "white" }).graduationCap}
        </div>

        <div
        onClick={handleLogout}
        className="opacity-60 hover:opacity-100 cursor-pointer"
        >

          {dataIcon({ size: 20, color: "#9E9E9E" }).logout}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 px-4 sm:px-6 md:px-10 py-6 flex flex-col items-center">

        {/* LOGO */}
        <div className="w-full flex justify-start mb-6 sm:mb-10">
          <img
            src="/src/assets/eduko-removebg-preview.png"
            alt="EDUCO"
            className="h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px]"
          />
        </div>

        {/* TEXT */}
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h1 className="text-[#2E7D32] text-base sm:text-lg md:text-xl font-semibold">
            Selamat datang, {sebutan} {username}. Di kelas anda
          </h1>
        </div>

        {/* CARD CONTAINER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-5xl px-4">

          {/* CARD 1 */}
          <div className="w-full min-h-[200px] sm:min-h-[240px] md:min-h-[280px] bg-[#4CAF50] rounded-2xl flex flex-col items-center justify-between py-6 sm:py-8 px-6 shadow-md hover:shadow-xl transition">

            <h2 className="text-white font-semibold text-sm sm:text-base text-center">
              Atur Misi
            </h2>

            <div className="bg-[#F4B400] w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] flex items-center justify-center rounded-xl">
              {dataIcon({ size: 28, color: "#2E7D32" }).listTodo}
            </div>

            <Link to="/guru/setting-misi">
              <button className="bg-[#E0E0E0] text-[#2E7D32] px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                Lakukan
              </button>
            </Link>

          </div>

          {/* CARD 2 */}
          <div className="w-full min-h-[200px] sm:min-h-[240px] md:min-h-[280px] bg-[#4CAF50] rounded-2xl flex flex-col items-center justify-between py-6 sm:py-8 px-6 shadow-md hover:shadow-xl transition">

            <h2 className="text-white font-semibold text-sm sm:text-base text-center">
              Lihat Daftar Siswa
            </h2>

            <div className="bg-[#F4B400] w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] flex items-center justify-center rounded-xl">
              {dataIcon({ size: 28, color: "#2E7D32" }).list}
            </div>

            <Link to="/guru/daftar-murid">
             <button className="bg-[#E0E0E0] text-[#2E7D32] px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                Lakukan
              </button>
            </Link>


          </div>

          {/* CARD 3 */}
          <div className="w-full min-h-[200px] sm:min-h-[240px] md:min-h-[280px] bg-[#4CAF50] rounded-2xl flex flex-col items-center justify-between py-6 sm:py-8 px-6 shadow-md hover:shadow-xl transition">

            <h2 className="text-white font-semibold text-sm sm:text-base text-center">
              Lihat Capaian Misi
            </h2>

            <div className="bg-[#F4B400] w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] flex items-center justify-center rounded-xl">
              {dataIcon({ size: 28, color: "#2E7D32" }).target}
            </div>

            <Link to="/guru/capaian-murid">
              <button className="bg-[#E0E0E0] text-[#2E7D32] px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
               Lakukan
              </button>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}
