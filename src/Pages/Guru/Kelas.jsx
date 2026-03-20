import React from "react";
import dataIcon from "/src/assets/Data/icon.jsx";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const sebutan = "Pak";
  const username = "Kopling";

  return (
    <div className="flex h-screen bg-[#F5F5F5]">

      {/* SIDEBAR */}
      <div className="w-[80px] bg-[#E7E3DE] flex flex-col items-center py-4 gap-6">
        
        <div>
          {dataIcon({ size: 26, color: "#4CAF50" }).menu}
        </div>

        <div className="bg-[#CFE8D5] p-3 rounded-xl">
          {dataIcon({ size: 24, color: "#2E7D32" }).graduationCap}
        </div>

        <div>
          {dataIcon({ size: 24, color: "#9E9E9E" }).logout}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 px-10 py-6 flex flex-col items-center bg-red">

        {/* LOGO */}
        <div className="w-full flex justify-start mb-10 ">
          <img 
            src="/src/assets/eduko-removebg-preview.png" 
            alt="EDUCO"
            className="h-[150px]"
          />
        </div>

        {/* TEXT */}
        <div className="text-center mb-12">
          <h1 className="text-[#2E7D32] text-[25px] font-semibold">
            Selamat datang, {sebutan} {username}. Di kelas anda
          </h1>
        </div>

        {/* CARD */}
        <div className="flex justify-center gap-12">

          {/* CARD 1 */}
         <div className="w-[280px] h-[280px] bg-[#4CAF50] rounded-2xl flex flex-col items-center justify-between py-6 shadow-md">
  
  <h2 className="text-white font-semibold text-[16px] text-center">
    Atur Misi
  </h2>

  <div className="bg-[#F4B400] w-[70px] h-[70px] flex items-center justify-center rounded-xl">
    {dataIcon({ size: 36, color: "#2E7D32" }).listTodo}
  </div>

  <Link to="/guru/setting-misi">
    <button className="bg-[#E0E0E0] text-[#2E7D32] px-6 py-1 rounded-full text-[13px]">
      Lakukan
    </button>
  </Link>

</div>

          {/* CARD 2 */}
          <div className="w-[280px] h-[280px] bg-[#4CAF50] rounded-2xl flex flex-col items-center justify-between py-6 shadow-md">
            
            <h2 className="text-white font-semibold text-[16px] text-center">
              Lihat Daftar Siswa
            </h2>

            <div className="bg-[#F4B400] w-[70px] h-[70px] flex items-center justify-center rounded-xl">
              {dataIcon({ size: 36, color: "#2E7D32" }).list}
            </div>

            <button className="bg-[#E0E0E0] text-[#2E7D32] px-6 py-1 rounded-full text-[13px]">
              Lakukan
            </button>
          </div>

          {/* CARD 3 */}
          <div className="w-[280px] h-[280px] bg-[#4CAF50] rounded-2xl flex flex-col items-center justify-between py-6 shadow-md">
            
            <h2 className="text-white font-semibold text-[16px] text-center">
              Lihat Capaian Misi
            </h2>

            <div className="bg-[#F4B400] w-[70px] h-[70px] flex items-center justify-center rounded-xl">
              {dataIcon({ size: 36, color: "#2E7D32" }).target}
            </div>

            <button className="bg-[#E0E0E0] text-[#2E7D32] px-6 py-1 rounded-full text-[13px]">
              Lakukan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}