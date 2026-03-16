import { useState, useEffect } from "react";
import dataMisiDitugaskan from "../../assets/Data/Mode Guru/dataMisiDitugaskan";
import dataListKelasGuru from "../../assets/Data/Mode Guru/dataListKelasGuru";

export default function Dashboard() {

  // TARUH DI SINI
  const [missions, setMissions] = useState([]);

  const sebutan = "Pak kopling";
  const username = "PakKopling1";

  const handleFecthMissions = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMissions(dataMisiDitugaskan);
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleFecthMissions();
  }, []);

  return (
    <div className="min-h-screen bg-[#EDEAE4] flex">

      {/* Sidebar */}
      <aside className="w-16 bg-[#EDEAE4] flex flex-col items-center pt-6 gap-6">
        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white">
          🌱
        </div>

        <div className="opacity-60 hover:opacity-100 cursor-pointer">
          📄
        </div>

        <div className="opacity-60 hover:opacity-100 cursor-pointer">
          🚪
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">

        {/* Navbar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold text-green-600">DUCO</div>
          </div>
        </div>

        {/* Welcome */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-600">
            Selamat datang, {sebutan} {username}.
          </h1>
        </div>

        {/* Kelas */}
        <div className="mb-10">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-yellow-500">
              Kelas anda
            </h2>

            <button className="text-yellow-500 text-2xl font-bold">
              +
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">

            {dataListKelasGuru.map((kelas) => (
              <div
                key={kelas.id}
                className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <div className="h-32 bg-gray-300"></div>

                <div className="bg-yellow-500 p-3 text-white">
                  <p className="font-semibold">{kelas.namaKelas}</p>
                  <p className="text-sm opacity-80">{kelas.jumlahSiswa}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Misi */}
        <div>

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Misi yang anda tugaskan
          </h2>

          <div className="flex flex-col gap-4">

            {missions.map((mission) => (
              <div
                key={mission.id}
                className="flex items-center bg-green-800 text-white rounded-2xl p-4"
              >
                <div className="text-2xl font-bold mr-6">
                  {mission.id}
                </div>

                <div className="flex-1">
                  <p className="font-semibold">{mission.namaMisi}</p>
                  <p className="text-yellow-400 text-sm">
                    {mission.namaKelas}
                  </p>
                </div>

                <div className="bg-white text-green-800 rounded-full w-10 h-10 flex items-center justify-center">
                  ➜
                </div>
              </div>
            ))}

          </div>
        </div>

      </main>
    </div>
  );}
