import React from "react";
import dataPelajar from "../../assets/Data/dataPelajar";
import dataIcon from "/src/assets/Data/icon.jsx";
import { useNavigate } from "react-router-dom";
import Logo from "/logo_Educo.svg";

export default function CapaianMurid() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate ("/");
    localStorage.removeItem("userRole");
  };


  return (
    <div className="flex min-h-screen bg-[#F3F0EC]">

      {/* SIDEBAR */}
      <div className="w-[80px] bg-[#E7E3DE] flex flex-col items-center py-4 gap-6">

        {/* Home Icon */}
        <div
        onClick={() => navigate("/")}
        className="opacity-60 hover:opacity-100 cursor-pointer transition-all duration-200 hover:scale-110"
        title="Kembali ke Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </div>

        {/* Active Icon */}
       <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center text-white">
          {dataIcon({ size: 18, color: "white" }).graduationCap}
        </div>

        {/* Logout Icon */}
        <div
        onClick={handleLogout}
        className="opacity-60 hover:opacity-100 cursor-pointer"
        >
          {dataIcon({ size: 24, color: "#9E9E9E" }).logout}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 px-4 sm:px-6 md:px-10 py-6 md:py-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
           <img src={Logo} alt="Logo" className="w-24 sm:w-28 md:w-32 h-auto" />
        </div>


        <div className="flex items-center gap-3 mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#F4A300]">
            Capaian Murid
          </h1>
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">

          {dataPelajar.map((murid) => {
            const progress = Math.round(
              (murid.mission_complated / murid.mission_gived) * 100
            );

            return (
              <div key={murid.id} className="px-2">

                {/* TEXT + PERCENT */}
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[#4CAF50] font-semibold text-sm sm:text-base md:text-lg">
                    {murid.nama}
                  </p>
                  <p className="text-[#4CAF50] font-semibold text-sm sm:text-base md:text-lg">
                    {progress}%
                  </p>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-[8px] sm:h-[10px] bg-[#CFCFCF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4CAF50] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
