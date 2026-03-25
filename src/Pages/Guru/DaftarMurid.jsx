import React from "react";
import dataIcon from "../../assets/Data/icon";
import dataPelajar from "../../assets/Data/dataPelajar";
import { useNavigate } from "react-router-dom";
import Logo from "/logo_Educo.svg";

export default function DaftarMurid() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("userRole");
  };


  const icon = dataIcon({ size: 22, color: "#2f7d32" });

  return (
    <div className="flex min-h-screen bg-[#d8d3cc]">

      {/* Sidebar */}
      <div className="w-[90px] flex flex-col items-center pt-6 gap-8">

        {/* Home */}
        <div
        onClick={() => navigate("/")}
        className="opacity-60 hover:opacity-100 cursor-pointer transition-all duration-200 hover:scale-110"
        title="Kembali ke Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25671E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </div>

        {/* Graduation */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center text-white">
          {dataIcon({ size: 18, color: "white" }).graduationCap}
        </div>

        {/* Logout */}
        <div onClick={handleLogout}
        className="opacity-60 hover:opacity-100 cursor-pointer"
        >
          {icon.logout}
        </div>

      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-10">

        {/* Logo */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <img src={Logo} alt="Logo" className="w-24 sm:w-28 md:w-32 h-auto" />
        </div>

        {/* Card */}
        <div className="bg-[#e7e3dd] rounded-lg p-4 sm:p-6 md:p-10">

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-500 mb-6 sm:mb-8 md:mb-10">
            Daftar Murid
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {dataPelajar.map((siswa) => (
              <div
                key={siswa.id}
                className="flex items-center gap-3 sm:gap-4 border-b border-green-600 pb-3 sm:pb-4"
              >

                {/* Profile Picture */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-green-600 shadow-md">
                  <img
                    src={siswa.foto}
                    alt={siswa.nama}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(siswa.nama) + "&background=4CAF50&color=fff";
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-green-700 font-semibold text-sm sm:text-base md:text-lg truncate">
                    {siswa.nama}
                  </p>
                  <p className="text-green-600 text-xs sm:text-sm">
                    {siswa.mission_complated}/{siswa.mission_gived} misi selesai
                  </p>
                </div>

                {/* Icon 3 titik */}
                <div className="cursor-pointer flex-shrink-0 ml-2">
                  {icon.more}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
