import { useState, useEffect } from "react";
import dataMisiDitugaskan from "../../assets/Data/Mode Guru/dataMisiDitugaskan";
import dataListKelasGuru from "../../assets/Data/Mode Guru/dataListKelasGuru";
import dataIcon from "../../assets/Data/icon";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/logo_Educo.svg";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("userRole");
  };

  const [missions, setMissions] = useState([]);

  const sebutan = "Pak";
  const username = "Kopling";

  const handleFecthMissions = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMissions(dataMisiDitugaskan);
  };

  useEffect(() => {
    handleFecthMissions();
  }, []);

  return (
    <div className="min-h-screen bg-last flex">

      {/* SIDEBAR */}
      <aside className="w-14 sm:w-16 md:w-20 h-screen fixed bg-last shadow-lg flex flex-col items-center pt-6 gap-6">

         <div
          onClick={() => navigate("/")}
          className="opacity-60 hover:opacity-100 cursor-pointer transition-all duration-200 hover:scale-110"
          title="Kembali ke Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
         </div>

        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center text-white">
          {dataIcon({ size: 18, color: "white" }).graduationCap}
        </div>

        <div
          onClick={handleLogout}
          className="opacity-60 hover:opacity-100 cursor-pointer"
        >
          {dataIcon({ size: 18, color: "#48a111" }).logout}
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 ml-14 sm:ml-16 md:ml-20 p-4 sm:p-6 md:p-8">

        {/* NAVBAR */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <img src={Logo} alt="Logo" className="w-24 sm:w-28 md:w-32 h-auto" />
        </div>

        {/* WELCOME */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
            Selamat datang, {sebutan} {username}.
          </h1>
        </div>

        {/* KELAS */}
        <div className="mb-8 sm:mb-10">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-accent">
              Kelas anda
            </h2>

            <Link to="/guru/buat-kelas">
              <button className="bg-accent hover:bg-accent/80 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
                {dataIcon({ size: 24, color: "#F7F0F0" }).plus}
              </button>
            </Link>

          </div>

          {/* RESPONSIVE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

            {dataListKelasGuru.map((kelas) => (
              <div
                key={kelas.id}
                className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-28 sm:h-32 bg-gray-300"></div>

                <div className="bg-accent p-3 flex justify-between items-center text-last">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      {kelas.namaKelas}
                    </p>
                    <p className="text-xs sm:text-sm opacity-80">
                      {kelas.jumlahSiswa} siswa
                    </p>
                  </div>

                  <Link to="/guru/kelas">
                    <div className="bg-white hover:scale-90 transition duration-300 text-secondary rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                      {dataIcon({ size: 18, color: "#f2b50b" }).control}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MISI */}
        <div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-secondary mb-4 sm:mb-6">
            Misi yang anda tugaskan
          </h2>

          <div className="flex flex-col gap-3 sm:gap-4">

            {missions.map((mission) => (
              <div
                key={mission.id}
                className="flex items-center shadow hover:shadow-lg transition hover:-translate-y-1 cursor-pointer bg-secondary text-last rounded-2xl p-3 sm:p-4"
              >
                <div className="text-lg sm:text-2xl font-bold mr-4 sm:mr-6">
                  0{mission.id}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-sm sm:text-base">
                    {mission.namaMisi}
                  </p>
                  <p className="text-accent text-xs sm:text-sm">
                    {mission.namaKelas}
                  </p>
                </div>

                <Link to="/guru/setting-misi">
                  <div className="bg-white hover:scale-90 transition duration-300 text-secondary rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                    ➜
                  </div>
                </Link>
              </div>
            ))}

          </div>
        </div>

      </main>
    </div>
  );
}
