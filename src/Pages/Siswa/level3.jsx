import React, { useState, useEffect, useCallback } from 'react';

// Injeksi Viewport untuk optimasi mobile
const siapkanViewportHp = () => {
  if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
  }
};

// Data Kasus - Murni Decision Tree (Tidak ada yang salah, semua punya konsekuensi)
// 4 Opsi per soal, masing-masing dengan efek ke 4 indikator dan tambahan Eco Score
const dataKeputusanKota = [
  {
    id: 1,
    cerita: "Pabrik tekstil pemasuk pajak terbesar ketahuan membuang limbah cair hitam ke sungai utama. Bau menyengat mulai dikeluhkan warga.",
    opsi: [
      { 
        teks: "Tutup pabrik sementara sampai mereka membangun sistem filter limbah standar internasional.", 
        efek: { lingkungan: 30, pendidikan: 10, kebahagiaan: -10, ekonomi: -20 }, 
        ecoScore: 50,
        alasan: "Tindakan tegas menyelamatkan sungai dengan cepat, tapi banyak buruh kehilangan pendapatan sementara dan ekonomi kota melambat." 
      },
      { 
        teks: "Beri peringatan keras dan denda besar, tapi biarkan tetap beroperasi sambil mencicil perbaikan.", 
        efek: { lingkungan: 10, pendidikan: 5, kebahagiaan: 5, ekonomi: 15 }, 
        ecoScore: 20,
        alasan: "Ekonomi tetap aman dan pajak denda masuk kas kota, namun sungai masih akan tercemar selama beberapa bulan ke depan." 
      },
      { 
        teks: "Berikan subsidi dari uang kota untuk membantu pabrik memasang alat pengolah limbah.", 
        efek: { lingkungan: 25, pendidikan: 0, kebahagiaan: 15, ekonomi: -15 }, 
        ecoScore: 40,
        alasan: "Solusi *win-win*. Sungai cepat bersih dan buruh tidak demo, tapi anggaran kota terkuras cukup banyak." 
      },
      { 
        teks: "Pura-pura tidak tahu demi menjaga iklim investasi dan pendapatan daerah.", 
        efek: { lingkungan: -40, pendidikan: -15, kebahagiaan: -20, ekonomi: 30 }, 
        ecoScore: -50,
        alasan: "Pendapatan kota meroket, namun ekosistem sungai hancur lebur dan warga mulai menderita penyakit kulit." 
      }
    ]
  },
  {
    id: 2,
    cerita: "Kebiasaan warga membuang sampah plastik ke sungai membuat aliran tersumbat. Saat hujan deras kemarin, pasar tumpah nyaris banjir.",
    opsi: [
      { 
        teks: "Bangun sistem 'Bank Sampah' di tiap RW agar plastik punya nilai jual.", 
        efek: { lingkungan: 20, pendidikan: 25, kebahagiaan: 15, ekonomi: 10 }, 
        ecoScore: 60,
        alasan: "Sangat edukatif! Warga belajar memilah sampah dan mendapat penghasilan tambahan. Solusi berkelanjutan terbaik." 
      },
      { 
        teks: "Tugaskan pasukan oranye bersihkan sungai setiap pagi pakai alat berat.", 
        efek: { lingkungan: 15, pendidikan: -5, kebahagiaan: 10, ekonomi: -15 }, 
        ecoScore: 10,
        alasan: "Sungai jadi bersih dengan cepat, tapi warga makin malas karena merasa selalu ada yang membersihkan sampah mereka." 
      },
      { 
        teks: "Pasang jaring raksasa di hilir sungai untuk menahan semua sampah.", 
        efek: { lingkungan: 5, pendidikan: 0, kebahagiaan: -5, ekonomi: -5 }, 
        ecoScore: 0,
        alasan: "Cuma memindahkan masalah. Jaring akan cepat jebol jika volume sampah terus bertambah dan bau menumpuk di satu titik." 
      },
      { 
        teks: "Berlakukan denda kurungan penjara bagi siapa saja yang ketahuan membuang sampah.", 
        efek: { lingkungan: 25, pendidikan: 10, kebahagiaan: -25, ekonomi: 0 }, 
        ecoScore: 30,
        alasan: "Sangat efektif bikin warga takut, namun memicu protes keras karena dianggap melanggar hak asasi dan memenjarakan warga miskin." 
      }
    ]
  },
  {
    id: 3,
    cerita: "Danau resapan kota dipenuhi enceng gondok (gulma air). Sinar matahari tidak bisa masuk, menyebabkan ikan endemik mati kekurangan oksigen.",
    opsi: [
      { 
        teks: "Ajak warga dan UMKM panen enceng gondok untuk diolah jadi tas kerajinan anyaman.", 
        efek: { lingkungan: 20, pendidikan: 15, kebahagiaan: 20, ekonomi: 25 }, 
        ecoScore: 70,
        alasan: "Luar biasa! Hama air berhasil diubah menjadi produk bernilai ekonomi tinggi yang memberdayakan warga." 
      },
      { 
        teks: "Sewa kontraktor swasta untuk mencabut dan membuang semuanya ke tempat pembuangan akhir.", 
        efek: { lingkungan: 15, pendidikan: 0, kebahagiaan: 5, ekonomi: -20 }, 
        ecoScore: 15,
        alasan: "Danau bersih dengan cepat tanpa merepotkan warga, tapi membebani anggaran kota dengan biaya yang sangat mahal." 
      },
      { 
        teks: "Sebar ikan pemakan tumbuhan (Koan) dalam jumlah masif ke danau.", 
        efek: { lingkungan: -10, pendidikan: 5, kebahagiaan: 0, ekonomi: -5 }, 
        ecoScore: -10,
        alasan: "Enceng gondok habis, tapi ikan Koan invasif ini malah ganti memakan semua telur ikan asli danau, merusak keseimbangan rantai makanan." 
      },
      { 
        teks: "Tuang herbisida kimia ke danau agar gulma mati membusuk dengan cepat.", 
        efek: { lingkungan: -35, pendidikan: -10, kebahagiaan: -5, ekonomi: 5 }, 
        ecoScore: -60,
        alasan: "Mengerikan. Racun kimia membunuh gulma sekaligus sisa ikan yang ada, dan meracuni cadangan air minum kota." 
      }
    ]
  },
  {
    id: 4,
    cerita: "Air sungai berubah jadi busa pekat gara-gara limbah deterjen dari puluhan usaha *laundry* rumahan di sepanjang bantaran.",
    opsi: [
      { 
        teks: "Sosialisasi dan wajibkan penggunaan deterjen ramah lingkungan (Biodegradable) bersubsidi.", 
        efek: { lingkungan: 25, pendidikan: 20, kebahagiaan: 10, ekonomi: -10 }, 
        ecoScore: 65,
        alasan: "Edukasi berjalan baik. Busa hilang perlahan dan bisnis *laundry* warga tetap bisa berjalan dengan bahan yang lebih aman." 
      },
      { 
        teks: "Tutup paksa semua usaha *laundry* di pinggir sungai tanpa kompromi.", 
        efek: { lingkungan: 30, pendidikan: 0, kebahagiaan: -30, ekonomi: -25 }, 
        ecoScore: 20,
        alasan: "Sungai langsung bebas busa hari itu juga, namun mematikan mata pencaharian puluhan keluarga dan memicu kemiskinan mendadak." 
      },
      { 
        teks: "Biarkan saja, karena itu adalah satu-satunya mata pencaharian warga bantaran.", 
        efek: { lingkungan: -25, pendidikan: -5, kebahagiaan: 15, ekonomi: 15 }, 
        ecoScore: -30,
        alasan: "Warga senang karena bisa bebas cari uang, namun anak-anak mereka mulai menderita gatal-gatal kronis akibat mandi air tercemar." 
      },
      { 
        teks: "Pindahkan semua *laundry* ke satu gedung khusus yang punya sistem pengolahan limbah sentral.", 
        efek: { lingkungan: 35, pendidikan: 5, kebahagiaan: -5, ekonomi: -30 }, 
        ecoScore: 50,
        alasan: "Sangat ideal secara tata kota, namun biaya pembangunan gedungnya menyedot habis anggaran infrastruktur tahun ini." 
      }
    ]
  },
  {
    id: 5,
    cerita: "Karena sungai makin tercemar, warga gila-gilaan menyedot air tanah pakai pompa jet untuk mandi dan minum. Permukaan tanah kota mulai ambles.",
    opsi: [
      { 
        teks: "Galakkan program sejuta sumur resapan (Biopori) dan wajibkan tiap rumah punya drum panen hujan.", 
        efek: { lingkungan: 35, pendidikan: 25, kebahagiaan: 10, ekonomi: -5 }, 
        ecoScore: 80,
        alasan: "Kebijakan master! Air hujan dikembalikan ke dalam tanah untuk mengisi ulang akuifer secara alami, mencegah tanah ambles." 
      },
      { 
        teks: "Bangun pabrik penyulingan air laut (Desalinasi) raksasa dengan hutang luar negeri.", 
        efek: { lingkungan: 10, pendidikan: 5, kebahagiaan: 20, ekonomi: -40 }, 
        ecoScore: 10,
        alasan: "Warga tak kekurangan air bersih lagi, tapi kota terbebani hutang triliunan rupiah selama puluhan tahun ke depan." 
      },
      { 
        teks: "Larang keras penyedotan air tanah dan paksa warga beli air tangki swasta.", 
        efek: { lingkungan: 20, pendidikan: -5, kebahagiaan: -35, ekonomi: -15 }, 
        ecoScore: -10,
        alasan: "Tanah berhenti ambles, tapi memicu kerusuhan besar karena air bersih jadi barang mewah yang tak terbeli orang miskin." 
      },
      { 
        teks: "Abaikan saja, biarkan alam mencari keseimbangannya sendiri.", 
        efek: { lingkungan: -40, pendidikan: -10, kebahagiaan: 0, ekonomi: 0 }, 
        ecoScore: -70,
        alasan: "Kelalaian fatal. Setahun kemudian, sebagian kota pesisir tenggelam permanen akibat tanah yang terus turun." 
      }
    ]
  }
];

// Helper penjaga nilai indikator tetap di antara 0-100
const kunciNilai = (nilai) => Math.max(0, Math.min(100, nilai));

export default function App({ onBack }) {
  const [tahapSkrg, setTahapSkrg] = useState(0);
  const [waktuSisa, setWaktuSisa] = useState(120); // 2 Menit
  const [statusAplikasi, setStatusAplikasi] = useState('mulai'); // 'mulai', 'main', 'kalah', 'menang'
  const [skorEcoTotal, setSkorEcoTotal] = useState(0);
  
  // 4 Indikator utama kota (Mulai dari 50, seimbang)
  const [statKota, setStatKota] = useState({
    lingkungan: 50,
    pendidikan: 50,
    kebahagiaan: 50,
    ekonomi: 50
  });

  // State Feedback Pop-up
  const [tampilInfo, setTampilInfo] = useState(false);
  const [dataInfo, setDataInfo] = useState(null);
  const [prosesTombol, setProsesTombol] = useState(false);

  // Inisialisasi Viewport
  useEffect(() => {
    siapkanViewportHp();
  }, []);

  // Timer yang otomatis pause saat popup muncul
  useEffect(() => {
    let intervalTimer;
    if (statusAplikasi === 'main' && waktuSisa > 0 && !tampilInfo) {
      intervalTimer = setInterval(() => {
        setWaktuSisa((prev) => prev - 1);
      }, 1000);
    } else if (waktuSisa <= 0 && statusAplikasi === 'main') {
      setStatusAplikasi('kalah');
    }
    return () => clearInterval(intervalTimer);
  }, [statusAplikasi, waktuSisa, tampilInfo]);

  // Pantau kondisi kekalahan instan (Jika ada stat menyentuh 0)
  useEffect(() => {
    if (statusAplikasi === 'main' && !tampilInfo) {
      const adaStatHancur = Object.values(statKota).some(nilai => nilai <= 0);
      if (adaStatHancur) {
        setTimeout(() => setStatusAplikasi('kalah'), 800); // Sedikit delay biar lihat bar nya habis
      }
    }
  }, [statKota, statusAplikasi, tampilInfo]);

  // Fungsi simpan data ke LocalStorage
  const catatSkorLokal = useCallback((skorFinal) => {
    try {
      localStorage.setItem('score3', parseInt(skorFinal).toString());
    } catch (e) {
      console.warn("Akses LocalStorage dicegah.");
    }
  }, []);

  // Saat tombol opsi ditekan
  const tanganiPilihan = (opsi) => {
    if (prosesTombol || statusAplikasi !== 'main' || tampilInfo) return;
    setProsesTombol(true);

    // Kalkulasi state baru
    const statBaru = {
      lingkungan: kunciNilai(statKota.lingkungan + opsi.efek.lingkungan),
      pendidikan: kunciNilai(statKota.pendidikan + opsi.efek.pendidikan),
      kebahagiaan: kunciNilai(statKota.kebahagiaan + opsi.efek.kebahagiaan),
      ekonomi: kunciNilai(statKota.ekonomi + opsi.efek.ekonomi),
    };

    setStatKota(statBaru);
    setSkorEcoTotal(prev => prev + opsi.ecoScore);

    // Jika indikator menyentuh 0, getar panjang (Kritis)
    const kritis = Object.values(statBaru).some(v => v <= 0);
    if (window.navigator?.vibrate) {
       window.navigator.vibrate(kritis ? [300, 100, 300] : [50]);
    }

    // Set data untuk popup alasan
    setDataInfo({
      alasan: opsi.alasan,
      efek: opsi.efek,
      ecoScore: opsi.ecoScore,
      kritisHancur: kritis
    });

    setTampilInfo(true);
    setProsesTombol(false);
  };

  const teruskanKeTahapSelanjutnya = () => {
    setTampilInfo(false);
    
    // Cegah lanjut kalau state useEffect kalah udah jalan
    if (statusAplikasi === 'kalah' || dataInfo?.kritisHancur) return;

    if (tahapSkrg + 1 < dataKeputusanKota.length) {
      setTahapSkrg(prev => prev + 1);
    } else {
      // Perhitungan Akhir (Menang)
      const bonusWaktu = Math.max(0, waktuSisa);
      const skorFix = skorEcoTotal + bonusWaktu;
      catatSkorLokal(skorFix);
      setStatusAplikasi('menang');
    }
  };

  const ulangiPermainan = () => {
    setTahapSkrg(0);
    setWaktuSisa(120);
    setSkorEcoTotal(0);
    setStatKota({ lingkungan: 50, pendidikan: 50, kebahagiaan: 50, ekonomi: 50 });
    setTampilInfo(false);
    setStatusAplikasi('main');
  };

  // --- KOMPONEN UI ---
  
  // Bar Indikator Atas
  const BarIndikator = ({ ikon, nilai, warnaBar, label }) => (
    <div className="flex flex-col items-center flex-1 mx-1">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 mb-1.5 z-10">
        <span className="text-sm">{ikon}</span>
      </div>
      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mb-1 relative">
        <div 
          className={`absolute top-0 left-0 h-full rounded-full transition-all duration-[800ms] ease-in-out ${warnaBar}`}
          style={{ width: `${nilai}%` }}
        ></div>
      </div>
      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  );

  // Helper Preview Efek di Tombol Opsi
  const PreviewEfek = ({ ikon, nilai }) => {
    if (nilai === 0) return null;
    const isPositif = nilai > 0;
    return (
      <span className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ml-1 ${isPositif ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {ikon} {isPositif ? '↑' : '↓'}
      </span>
    );
  };

  // 1. RENDER LAYAR AWAL (CLEAN UI)
  if (statusAplikasi === 'mulai') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#25671E] via-[#48A111] to-[#1a4a1a] flex flex-col items-center justify-center p-6 font-sans relative">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 bg-white/20 border-2 border-white/30 text-white font-bold py-2.5 px-5 rounded-xl backdrop-blur-sm shadow-lg hover:bg-white/30 hover:scale-105 transition-all z-50"
            style={{ fontSize: 14 }}
          >
            ← Kembali
          </button>
        )}

        {/* Ornamen Hijau Air yang Lembut */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2B50B] rounded-bl-full opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#48A111] rounded-tr-full opacity-30"></div>

        <div className="z-10 bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(37,103,30,0.3)] border border-[#48A111]/20 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-2xl bg-[#48A111] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200 rotate-3">
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-1 tracking-tight">EcoMission</h1>
          <h2 className="text-sm font-bold text-[#25671E] mb-6 uppercase tracking-widest">Kepala Daerah: Air</h2>
          
          <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-100 mb-8">
            <p className="text-slate-600 text-sm font-medium leading-relaxed mb-3">
              Uji kemampuanmu memimpin. Setiap keputusan memengaruhi 4 sektor kota. Tidak ada jawaban salah, tapi ada harga yang harus dibayar.
            </p>
            <ul className="text-xs text-slate-500 space-y-2 font-semibold">
              <li className="flex items-center">Jaga 4 bar indikator jangan sampai habis (0).</li>
              <li className="flex items-center">Kumpulkan Eco Score setinggi mungkin.</li>
              <li className="flex items-center">Waktu menjabat: 2 Menit.</li>
            </ul>
          </div>
          
          <button
            onTouchEnd={(e) => { e.preventDefault(); setStatusAplikasi('main'); }}
            onClick={() => setStatusAplikasi('main')}
            className="w-full bg-[#48A111] text-white font-bold py-4 rounded-xl shadow-[0_5px_0_#25671E] active:shadow-none active:translate-y-[5px] transition-all text-lg tracking-wide touch-manipulation"
          >
            MULAI MEMIMPIN
          </button>
        </div>
      </div>
    );
  }

  const kasusBerjalan = dataKeputusanKota[tahapSkrg];

  // 2. RENDER GAMEPLAY UTAMA
  // Dibungkus kondisi agar TIDAK NONGOL saat Menang/Kalah
  if (statusAplikasi === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E8F5E9] via-[#F7F0F0] to-[#C8E6C9] flex flex-col items-center justify-start sm:p-6 p-4 font-sans relative">

        {/* Wrapper utama yang sangat bersih */}
        <div className="w-full max-w-lg z-10 flex-1 flex flex-col">

          {/* HEADER: Waktu & Total Eco Score */}
          <header className="flex justify-between items-center mb-4">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-[#48A111]/20 flex items-center">
              <span className="text-xs font-bold text-slate-400 uppercase mr-2">Eco Score</span>
              <span className="text-lg font-black text-[#48A111]">{skorEcoTotal}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-[#25671E]/20 flex items-center">
               <span className="text-xs font-bold text-slate-400 uppercase mr-2">Waktu</span>
              <span className={`text-lg font-black ${waktuSisa <= 15 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
                {waktuSisa}s
              </span>
            </div>
          </header>

          {/* HUD 4 INDIKATOR (Bilah Kemajuan) */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#48A111]/10 mb-6 flex justify-between items-end">
            <BarIndikator ikon="" nilai={statKota.lingkungan} warnaBar={statKota.lingkungan > 25 ? "bg-[#48A111]" : "bg-red-500"} label="Alam" />
            <BarIndikator ikon="" nilai={statKota.pendidikan} warnaBar={statKota.pendidikan > 25 ? "bg-[#F2B50B]" : "bg-red-500"} label="Edukasi" />
            <BarIndikator ikon="" nilai={statKota.kebahagiaan} warnaBar={statKota.kebahagiaan > 25 ? "bg-[#F2B50B]" : "bg-red-500"} label="Warga" />
            <BarIndikator ikon="" nilai={statKota.ekonomi} warnaBar={statKota.ekonomi > 25 ? "bg-[#25671E]" : "bg-red-500"} label="Ekonomi" />
          </div>

          {/* KARTU CERITA */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#48A111]/20 mb-6 relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#48A111] rounded-l-2xl"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
              Masalah {tahapSkrg + 1} dari {dataKeputusanKota.length}
            </span>
            <p className="text-slate-700 text-[15px] leading-relaxed font-medium">
              {kasusBerjalan.cerita}
            </p>
          </div>

          {/* 4 TOMBOL OPSI (Dinamis dengan Preview) */}
          <div className="flex flex-col space-y-3 pb-8">
            {kasusBerjalan.opsi.map((opsi, index) => (
              <button
                key={index}
                disabled={prosesTombol || tampilInfo}
                onTouchEnd={(e) => { e.preventDefault(); tanganiPilihan(opsi); }}
                onClick={() => tanganiPilihan(opsi)}
                className={`
                  text-left p-4 rounded-xl transition-all duration-200 touch-manipulation relative overflow-hidden group bg-white border border-slate-200 shadow-sm
                  ${(prosesTombol || tampilInfo) ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#48A111] hover:shadow-md active:scale-[0.98]'}
                `}
              >
                <div className="flex flex-col">
                  <span className="text-slate-700 font-semibold text-[14px] leading-snug mb-3">
                    {opsi.teks}
                  </span>
                  
                  {/* Preview Efek Indikator Kecil di Bawah Teks */}
                  <div className="flex flex-wrap items-center pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mr-2">Prediksi Efek:</span>
                    <PreviewEfek ikon="" nilai={opsi.efek.lingkungan} />
                    <PreviewEfek ikon="" nilai={opsi.efek.pendidikan} />
                    <PreviewEfek ikon="" nilai={opsi.efek.kebahagiaan} />
                    <PreviewEfek ikon="" nilai={opsi.efek.ekonomi} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* POPUP ALASAN (Muncul Setelah Memilih) */}
        {tampilInfo && dataInfo && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl transform transition-all animate-in zoom-in-95 duration-300">
              
              <div className="text-center mb-4">
                <span className="text-4xl block mb-2">{dataInfo.kritisHancur ? '🚨' : '⚖️'}</span>
                <h3 className={`text-xl font-black uppercase tracking-wider ${dataInfo.kritisHancur ? 'text-red-500' : 'text-slate-800'}`}>
                  {dataInfo.kritisHancur ? 'Krisis Fatal!' : 'Konsekuensi'}
                </h3>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl mb-5 border border-slate-100">
                <p className="text-[14px] text-slate-600 font-medium leading-relaxed text-center italic mb-4">
                  "{dataInfo.alasan}"
                </p>
                
                {/* Info Eco Score yang didapat */}
                <div className="flex justify-center items-center py-2 border-t border-slate-200">
                   <span className="text-xs font-bold text-slate-500 mr-2">Eco Score:</span>
                   <span className={`text-lg font-black ${dataInfo.ecoScore >= 0 ? 'text-[#4CAF50]' : 'text-red-500'}`}>
                     {dataInfo.ecoScore > 0 ? `+${dataInfo.ecoScore}` : dataInfo.ecoScore}
                   </span>
                </div>
              </div>

              <button
                onTouchEnd={(e) => { e.preventDefault(); teruskanKeTahapSelanjutnya(); }}
                onClick={teruskanKeTahapSelanjutnya}
                className="w-full bg-[#48A111] text-white font-bold py-4 rounded-xl transition-all shadow-[0_5px_0_#25671E] active:shadow-none active:translate-y-[5px] text-lg tracking-wide"
              >
                {dataInfo.kritisHancur ? 'LIHAT KEHANCURAN' : 'LANJUTKAN MISI ➡️'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. RENDER LAYAR KALAH (Bersih, tidak menimpa UI utama)
  if (statusAplikasi === 'kalah') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFEBEE] via-[#F7F0F0] to-[#FFCDD2] flex flex-col items-center justify-center p-6 font-sans">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 bg-white/20 border-2 border-white/30 text-white font-bold py-2.5 px-5 rounded-xl backdrop-blur-sm shadow-lg hover:bg-white/30 hover:scale-105 transition-all z-50"
            style={{ fontSize: 14 }}
          >
            ← Kembali
          </button>
        )}
        
        <div className="bg-white p-8 rounded-3xl w-full max-w-sm text-center shadow-xl border border-red-100">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">KOTA KOLAPS!</h2>
          <p className="text-slate-600 mb-6 font-medium text-[14px] leading-relaxed">
            {waktuSisa <= 0
              ? "Waktu kepemimpinan habis sebelum solusi nyata terwujud."
              : "Blunder fatal! Salah satu sektor vital (Alam/Edukasi/Warga/Ekonomi) hancur menyentuh angka 0."}
          </p>

          <div className="bg-slate-50 p-4 rounded-xl mb-8 border border-slate-100">
             <p className="text-xs font-bold text-slate-400 uppercase mb-1">Eco Score Terakhir</p>
             <p className="text-2xl font-black text-slate-800">{skorEcoTotal}</p>
          </div>

          <button
            onTouchEnd={(e) => { e.preventDefault(); ulangiPermainan(); }}
            onClick={ulangiPermainan}
            className="w-full bg-[#48A111] text-white font-bold py-4 rounded-xl shadow-[0_5px_0_#25671E] active:shadow-none active:translate-y-[5px] transition-all text-lg"
          >
            🔄 COBA PIMPIN LAGI
          </button>
        </div>
      </div>
    );
  }

  // 4. RENDER LAYAR MENANG (Bersih, tidak menimpa UI utama)
  if (statusAplikasi === 'menang') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#48A111] via-[#25671E] to-[#1a4a1a] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 bg-white/20 border-2 border-white/30 text-white font-bold py-2.5 px-5 rounded-xl backdrop-blur-sm shadow-lg hover:bg-white/30 hover:scale-105 transition-all z-50"
            style={{ fontSize: 14 }}
          >
            ← Kembali
          </button>
        )}
        
        {/* Ornamen Pesta Sederhana */}
        <div className="absolute top-10 left-10 text-4xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-30"></div>

        <div className="bg-white p-8 rounded-3xl w-full max-w-md text-center shadow-2xl relative z-10">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 border-4 border-[#48A111]/20">
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">KOTA BERTAHAN!</h2>
          <p className="text-slate-600 mb-6 font-medium leading-relaxed">
            Masa jabatan usai! Kamu berhasil menjaga keseimbangan Alam, Edukasi, Warga, dan Ekonomi kota.
          </p>

          <div className="bg-[#E8F5E9] border border-[#48A111]/30 rounded-2xl p-6 mb-8">
            <p className="text-xs text-[#25671E] font-extrabold uppercase tracking-widest mb-2">FINAL ECO SCORE</p>
            <p className="text-5xl font-black text-[#48A111] drop-shadow-sm">
              {skorEcoTotal + Math.max(0, waktuSisa)}
            </p>
            <p className="text-[11px] text-[#25671E] font-semibold mt-2">
              (Termasuk Bonus Sisa Waktu {Math.max(0, waktuSisa)}s)
            </p>
          </div>

          <button
            onTouchEnd={(e) => {
              e.preventDefault();
              alert('Skor berhasil dicatat di LocalStorage! Menuju level berikutnya...');
            }}
            onClick={() => alert('Skor berhasil dicatat di LocalStorage! Menuju level berikutnya...')}
            className="w-full bg-[#F2B50B] text-white font-bold py-4 rounded-xl shadow-[0_5px_0_#B8860B] active:shadow-none active:translate-y-[5px] transition-all text-lg tracking-wide"
          >
            LANJUT LEVEL 4
          </button>
        </div>
      </div>
    );
  }
}


