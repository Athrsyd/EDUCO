import React from "react";
import dataIcon from "../../assets/Data/icon";
import daftarSiswa from "../../assets/Data/Mode Guru/dataDaftarSiswa";

export default function DaftarMurid() {



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
        <div className="mt-auto mb-8 cursor-pointer">
          {icon.logout}
        </div>

      </div>

      {/* Content */}
      <div className="flex-1 p-10">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          EDUCO
        </h1>

        {/* Card */}
        <div className="bg-[#e7e3dd] rounded-lg p-10">

          <h2 className="text-4xl font-bold text-yellow-500 mb-10">
            Daftar Murid
          </h2>

          <div className="space-y-6">
            {daftarSiswa.map((siswa) => (
              <div
                key={siswa.id}
                className="flex justify-between items-center border-b border-green-600 pb-2"
              >

                <p className="text-green-700 font-semibold text-lg">
                  {siswa.nama}
                </p>

                {/* Icon 3 titik */}
                <div className="cursor-pointer">
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