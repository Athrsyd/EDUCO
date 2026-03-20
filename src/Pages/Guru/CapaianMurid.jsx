import React from "react";
import dataPelajar from "../../assets/Data/dataPelajar";
import dataIcon from "/src/assets/Data/icon.jsx";
import { Navigate, useNavigate } from "react-router-dom";


export default function DaftarMurid() {

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
      <div className="flex-1 px-10 py-8">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-10">
          <h1 className="text-[36px] font-bold text-[#F4A300]">
            Daftar Murid
          </h1>
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-8">

          {dataPelajar.map((murid) => {
            const progress = Math.round(
              (murid.mission_complated / murid.mission_gived) * 100
            );

            return (
              <div key={murid.id}>

                {/* TEXT + PERCENT */}
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[#4CAF50] font-semibold text-[16px]">
                    {murid.nama}
                  </p>
                  <p className="text-[#4CAF50] font-semibold text-[16px]">
                    {progress}%
                  </p>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-[8px] bg-[#CFCFCF] rounded-full">
                  <div
                    className="h-[8px] bg-[#4CAF50] rounded-full"
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