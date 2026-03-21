import React from "react";
import dataIcon from "../../assets/Data/icon";
import daftarSiswa from "../../assets/Data/Mode Guru/dataDaftarSiswa";
import { useNavigate } from "react-router-dom";

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

        {/* Menu */}
        <div className="cursor-pointer">
          {dataIcon({ size: 28, color: "#25671E" }).menu}
        </div>

        {/* Graduation */}
        <div className="bg-[#9fc79f] p-3 rounded-full">
          {icon.graduationCap}
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
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 sm:mb-6">
          EDUCO
        </h1>

        {/* Card */}
        <div className="bg-[#e7e3dd] rounded-lg p-4 sm:p-6 md:p-10">

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-500 mb-6 sm:mb-8 md:mb-10">
            Daftar Murid
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {daftarSiswa.map((siswa) => (
              <div
                key={siswa.id}
                className="flex justify-between items-center border-b border-green-600 pb-2 sm:pb-3"
              >

                <p className="text-green-700 font-semibold text-sm sm:text-base md:text-lg truncate flex-1">
                  {siswa.nama}
                </p>

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
