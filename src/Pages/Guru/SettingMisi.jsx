import React from "react";
import dataMisiDitugaskan from "../../assets/Data/Mode Guru/dataMisiDitugaskan";
import dataIcon from "/src/assets/Data/icon.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Misi() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate ("/");
    localStorage.removeItem ("userRole");
};

  return (
    <div className="flex min-h-screen bg-[#F3F0EC]">

      {/* SIDEBAR */}
      <div className="w-14 sm:w-16 md:w-20 bg-[#E7E3DE] flex flex-col items-center py-4 gap-6">

        {/* Menu */}
        <div>
          {dataIcon({ size: 20, color: "#4CAF50" }).menu}
        </div>

        {/* Active */}
        <div className="bg-[#CFE8D5] p-2 sm:p-3 rounded-xl">
          {dataIcon({ size: 20, color: "#2E7D32" }).graduationCap}
        </div>

        {/* Logout */}
        <div 
        onClick={handleLogout}
        className="opacity-60 hover:opacity-100 cursor-pointer"
        >
          {dataIcon({ size: 20, color: "#9E9E9E" }).logout}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 px-4 sm:px-6 md:px-10 py-6">

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <img
            src="/src/assets/eduko-removebg-preview.png"
            alt="logo"
            className="w-24 sm:w-28 md:w-32 h-auto"
          />
        </div>

        {/* HEADER */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F4A300] mb-4 sm:mb-6">
          Daftar Murid
        </h1>

        {/* BUTTON */}
        <Link to="/guru/create-misi">
          <button className="flex items-center gap-2 bg-[#4CAF50] text-white px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6 text-sm sm:text-base">
            Buat Misi
            {dataIcon({ size: 16, color: "#FFFFFF" }).plus}
          </button>
        </Link>

        {/* LIST MISI */}
        <div className="flex flex-col gap-3 sm:gap-5">

          {dataMisiDitugaskan.map((misi, index) => (
            <div
              key={misi.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#1B5E20] px-4 sm:px-6 py-4 sm:py-5 rounded-2xl gap-3 sm:gap-0"
            >

              {/* LEFT */}
              <div className="flex items-center gap-4 sm:gap-6">

                {/* NUMBER */}
                <h2 className="text-white text-lg sm:text-2xl md:text-[28px] font-bold">
                  {String(index + 1).padStart(2, "0")}
                </h2>

                {/* TEXT */}
                <div>
                  <p className="text-white text-sm sm:text-base font-medium">
                    {misi.namaMisi}
                  </p>
                  <p className="text-[#F4A300] text-xs sm:text-sm">
                    {misi.namaKelas}
                  </p>
                </div>

              </div>

              {/* RIGHT ICON */}
              <div className="flex items-center gap-4 sm:gap-6 justify-end">

                {dataIcon({ size: 20, color: "#FFFFFF" }).trash ||
                  <span>
                    {dataIcon({ size: 20, color: "#FFFFFF" }).delete}
                  </span>
                }

                {dataIcon({ size: 20, color: "#FFFFFF" }).edit ||
                  <span>
                    {dataIcon({ size: 20, color: "#FFFFFF" }).pen}
                  </span>
                }

              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}