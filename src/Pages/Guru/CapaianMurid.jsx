import React from "react";
import dataPelajar from "../../assets/Data/dataPelajar";
import dataIcon from "/src/assets/Data/icon.jsx";
import { useNavigate } from "react-router-dom";


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

        {/* Menu Icon */}
        <div>
          {dataIcon({ size: 26, color: "#4CAF50" }).menu}
        </div>

        {/* Active Icon */}
        <div className="bg-[#CFE8D5] p-3 rounded-xl">
          {dataIcon({ size: 24, color: "#2E7D32" }).graduationCap}
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
