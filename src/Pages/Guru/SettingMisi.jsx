import React from "react";
import dataMisiDitugaskan from "../../assets/Data/Mode Guru/dataMisiDitugaskan";
import dataIcon from "/src/assets/Data/icon.jsx";
import { Link } from "react-router-dom";

export default function Misi() {
  return (
    <div className="flex h-screen bg-[#F3F0EC]">

      {/* SIDEBAR */}
      <div className="w-[80px] bg-[#E7E3DE] flex flex-col items-center py-4 gap-6">

        {/* Menu */}
        <div>
          {dataIcon({ size: 26, color: "#4CAF50" }).menu}
        </div>

        {/* Active */}
        <div className="bg-[#CFE8D5] p-3 rounded-xl">
          {dataIcon({ size: 24, color: "#2E7D32" }).graduationCap}
        </div>

        {/* Logout */}
        <div>
          {dataIcon({ size: 24, color: "#9E9E9E" }).logout}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 px-10 py-6">
        <div className="flex items-center gap-3 mb-8">
          <img
          src="/src/assets/eduko-removebg-preview.png"
          alt="" />
        </div>

        {/* HEADER */}
        <h1 className="text-[36px] font-bold text-[#F4A300] mb-6">
          Daftar Murid
        </h1>

        {/* BUTTON */}
        <Link to="/guru/create-misi">
          <button className="flex items-center gap-2 bg-[#4CAF50] text-white px-5 py-2 rounded-full mb-6">
            Buat Misi
            {dataIcon({ size: 18, color: "#FFFFFF" }).plus}
          </button>
        </Link>

        {/* LIST MISI */}
        <div className="flex flex-col gap-5">

          {dataMisiDitugaskan.map((misi, index) => (
            <div
              key={misi.id}
              className="flex items-center justify-between bg-[#1B5E20] px-6 py-5 rounded-2xl"
            >

              {/* LEFT */}
              <div className="flex items-center gap-6">

                {/* NUMBER */}
                <h2 className="text-white text-[28px] font-bold">
                  {String(index + 1).padStart(2, "0")}
                </h2>

                {/* TEXT */}
                <div>
                  <p className="text-white text-[16px] font-medium">
                    {misi.namaMisi}
                  </p>
                  <p className="text-[#F4A300] text-[14px]">
                    {misi.namaKelas}
                  </p>
                </div>

              </div>

              {/* RIGHT ICON */}
              <div className="flex items-center gap-6">

                {dataIcon({ size: 26, color: "#FFFFFF" }).trash ||
                  <span>
                    {dataIcon({ size: 26, color: "#FFFFFF" }).delete}
                  </span>
                }

                {dataIcon({ size: 26, color: "#FFFFFF" }).edit ||
                  <span>
                    {dataIcon({ size: 26, color: "#FFFFFF" }).pen}
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