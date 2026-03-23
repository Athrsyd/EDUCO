import React from "react";
import dataIcon from "../../assets/Data/icon";
import daftarSiswa from "../../assets/Data/Mode Guru/dataDaftarSiswa";
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

        {/* Menu */}
        <div 
        onClick={() => navigate("/guru/kelas")}
        className="opacity-60 hover:opacity-100 cursor-pointer"
        >
          {dataIcon({ size: 24, color: "#25671E" }).menu}
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
