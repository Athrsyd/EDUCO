import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dataIcon from "../../assets/Data/icon";
import dataPelajar from "../../assets/Data/dataPelajar";
import Logo from "/logo_Educo.svg";

export default function BuatKelas() {
  const navigate = useNavigate();
  const [namaKelas, setNamaKelas] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [selectedSiswa, setSelectedSiswa] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("userRole");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const toggleSiswa = (id) => {
    if (selectedSiswa.includes(id)) {
      setSelectedSiswa(selectedSiswa.filter(s => s !== id));
    } else {
      setSelectedSiswa([...selectedSiswa, id]);
    }
  };

  const selectAll = () => {
    if (selectedSiswa.length === filteredSiswa.length) {
      setSelectedSiswa([]);
    } else {
      setSelectedSiswa(filteredSiswa.map(s => s.id));
    }
  };

  const handleSubmit = () => {
    if (namaKelas.trim() && deskripsi.trim() && selectedSiswa.length > 0) {
      alert(`Kelas "${namaKelas}" berhasil dibuat dengan ${selectedSiswa.length} siswa!`);
      navigate("/guru/dashboard");
    } else {
      alert("Mohon isi semua field dan pilih minimal 1 siswa!");
    }
  };

  const filteredSiswa = dataPelajar.filter(siswa =>
    siswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F3F0EC] flex">

      {/* SIDEBAR */}
      <aside className="w-14 sm:w-16 md:w-20 h-screen fixed bg-[#E7E3DE] shadow-lg flex flex-col items-center pt-6 gap-6">
        <div
          onClick={() => navigate("/")}
          className="opacity-60 hover:opacity-100 cursor-pointer transition-all duration-200 hover:scale-110"
          title="Kembali ke Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </div>

        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#48A111] rounded-xl flex items-center justify-center text-white">
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
      <main className="flex-1 ml-14 sm:ml-16 md:ml-20 p-4 sm:p-6 md:p-8 overflow-y-auto">

        {/* NAVBAR */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <img src={Logo} alt="Logo" className="w-24 sm:w-28 md:w-32 h-auto" />
        </div>

        {/* KEMBALI BUTTON */}
        <button onClick={handleBack} className="flex items-center gap-2 bg-[#4CAF50] text-white px-4 sm:px-5 py-2 rounded-full mb-6 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Kembali
        </button>

        {/* HEADER */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F4A900] mb-6">
          Buat Kelas Baru
        </h1>

        {/* FORM */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT - Form Input */}
          <div className="flex-1 space-y-6">

            {/* Nama Kelas Card */}
            <div className="bg-[#F4A900] rounded-2xl p-5 sm:p-6 shadow-md">
              <label className="block text-white font-semibold text-sm sm:text-base mb-3">
                Nama Kelas
              </label>
              <input
                type="text"
                placeholder="Contoh: Kelas 10 IPA 1"
                value={namaKelas}
                onChange={(e) => setNamaKelas(e.target.value)}
                className="w-full bg-white/20 text-white placeholder-white/70 text-sm sm:text-base font-medium outline-none border-none rounded-xl px-4 py-3"
              />
            </div>

            {/* Deskripsi Card */}
            <div className="bg-[#F4A900] rounded-2xl p-5 sm:p-6 shadow-md">
              <label className="block text-white font-semibold text-sm sm:text-base mb-3">
                Deskripsi Kelas
              </label>
              <textarea
                placeholder="Deskripsikan kelas ini..."
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                rows={5}
                className="w-full bg-white/20 text-white placeholder-white/70 text-sm sm:text-base font-medium outline-none border-none rounded-xl px-4 py-3 resize-none"
              />
            </div>

          </div>

          {/* RIGHT - Siswa Selection */}
          <div className="w-full lg:w-[400px] bg-[#F4A900] rounded-2xl p-5 sm:p-6 shadow-md h-fit">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg sm:text-xl">
                Pilih Siswa
              </h3>
              <span className="text-white text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                {selectedSiswa.length} terpilih
              </span>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Cari siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/20 text-white placeholder-white/70 text-sm outline-none border-none rounded-xl px-4 py-2.5 pr-10"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
                {dataIcon({ size: 18, color: "#F7F0F0" }).search}
              </div>
            </div>

            {/* Select All */}
            <button
              onClick={selectAll}
              className="w-full bg-white/20 text-white text-sm font-semibold py-2 rounded-xl mb-4 hover:bg-white/30 transition-all"
            >
              {selectedSiswa.length === filteredSiswa.length ? "Batal Pilih Semua" : "Pilih Semua"}
            </button>

            {/* Siswa List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredSiswa.map((siswa) => (
                <div
                  key={siswa.id}
                  onClick={() => toggleSiswa(siswa.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedSiswa.includes(siswa.id)
                      ? "bg-white/30 shadow-md"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {/* Profile Picture */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/50 shadow-sm">
                    <img
                      src={siswa.foto}
                      alt={siswa.nama}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(siswa.nama) + "&background=4CAF50&color=fff";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">
                      {siswa.nama}
                    </p>
                  </div>

                  {/* Check Icon */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    selectedSiswa.includes(siswa.id)
                      ? "bg-white text-[#4CAF50]"
                      : "bg-white/20 text-white/50"
                  }`}>
                    {dataIcon({ size: 14, color: selectedSiswa.includes(siswa.id) ? "#4CAF50" : "#F7F0F0" }).check}
                  </div>
                </div>
              ))}
            </div>

            {filteredSiswa.length === 0 && (
              <div className="text-center text-white/70 text-sm py-8">
                Tidak ada siswa ditemukan
              </div>
            )}
          </div>
        </div>

        {/* Submit Button - Di Paling Bawah */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#4CAF50] text-white py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-md hover:bg-[#43A047] hover:shadow-lg transition-all duration-300"
          >
            Buat Kelas
          </button>
        </div>
      </main>
    </div>
  );
}
