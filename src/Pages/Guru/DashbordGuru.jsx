import { useState, useEffect } from "react";
import dataMisiDitugaskan from "../../assets/Data/Mode Guru/dataMisiDitugaskan";
import dataListKelasGuru from "../../assets/Data/Mode Guru/dataListKelasGuru";
import dataIcon from "../../assets/Data/icon";
import {Link, useNavigate} from 'react-router-dom'
import Logo from "/logo_Educo.svg";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('userRole');
  };

  // TARUH DI SINI
  const [missions, setMissions] = useState([]);

  const sebutan = "Pak";
  const username = "Kopling";

  const handleFecthMissions = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMissions(dataMisiDitugaskan);
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleFecthMissions();
  }, []);

  return (
    <div className="min-h-screen bg-last flex">

      {/* Sidebar */}
      <aside className="w-16 h-screen fixed bg-last shadow-lg flex flex-col items-center pt-6 gap-6">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
          {dataIcon({ size: 20, color: "white" }).graduationCap}
        </div>


        <div onClick={()=>handleLogout()} className=" opacity-60 hover:opacity-100 cursor-pointer">
          {dataIcon({ size: 20, color: "#48a111" }).logout}

        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-15 p-8">

        {/* Navbar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Logo" className="w-30 h-10" />
          </div>
        </div>

        {/* Welcome */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary">
            Selamat datang, {sebutan} {username}.
          </h1>
        </div>

        {/* Kelas */}
        <div className="mb-10">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-accent">
              Kelas anda
            </h2>

            <button className="text-accent text-2xl font-bold">
              +
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">

            {dataListKelasGuru.map((kelas) => (
              <div
                key={kelas.id}
                className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition hover:transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-32 bg-gray-300"></div>

                <div className="bg-accent p-3 flex flex-row justify-between text-last">
                  <div className="">
                    <p className="font-semibold">{kelas.namaKelas}</p>
                    <p className="text-sm opacity-80">{kelas.jumlahSiswa} siswa</p>
                  </div>
                  {/* Control Button */}
                  <Link to='/guru/kelas'>
                  <div className="bg-white hover:scale-90 ease-in-out transition duration-300 text-secondary rounded-full w-10 h-10 flex items-center justify-center">
                    {dataIcon({ size: 20, color: "#f2b50b" }).control}
                  </div>
                  </Link>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Misi */}
        <div>

          <h2 className="text-2xl font-bold text-secondary mb-6">
            Misi yang anda tugaskan
          </h2>

          <div className="flex flex-col gap-4">

            {missions.map((mission) => (
              <div
                key={mission.id}
                className="flex items-center  shadow hover:shadow-lg transition hover:transform hover:-translate-y-1 cursor-pointer bg-secondary text-last rounded-2xl p-4"
              >
                <div className="text-2xl font-bold mr-6">
                  0{mission.id}
                </div>

                <div className="flex-1">
                  <p className="font-semibold">{mission.namaMisi}</p>
                  <p className="text-accent text-sm">
                    {mission.namaKelas}
                  </p>
                </div>
                <Link to='/guru/setting-misi'>
                <div className="bg-white hover:scale-90 ease-in-out transition duration-300 text-secondary rounded-full w-10 h-10 flex items-center justify-center">
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
