import { useState, useEffect, useCallback, useRef } from "react";

/* ─── KONSTANTA ─────────────────────────────────────────── */
const DURASI_LEVEL = 90;
const SKOR_BENAR   = 10;
const SKOR_SALAH   = -5;

const WARNA_TOMBOL = [
  { bg: "#48A111", shadow: "#25671E" },
  { bg: "#F2B50B", shadow: "#B8860B" },
  { bg: "#25671E", shadow: "#1a4a1a" },
  { bg: "#4CAF50", shadow: "#2E7D32" },
  { bg: "#F7F0F0", shadow: "#C0C0C0" },
];

const DAFTAR_SOAL = [
  {
    id: 1,
    teks: "Kota Hijau dilanda polusi udara. Kebijakan mana yang paling efektif?",
    pilihan: [
      { teks: "Perbanyak jalur bus listrik & MRT", benar: true,  dampak: "Emisi CO₂ berkurang hingga 45%!" },
      { teks: "Bangun lebih banyak jalan tol baru", benar: false, dampak: "Kemacetan & polusi justru makin parah." },
      { teks: "Izinkan pabrik tanpa filter emisi",  benar: false, dampak: "Kualitas udara memburuk drastis." },
      { teks: "Naikkan harga BBM tanpa solusi lain", benar: false, dampak: "Ekonomi terganggu, masalah tak selesai." },
    ],
  },
  {
    id: 2,
    teks: "Sumber utama gas rumah kaca penyebab pemanasan global adalah...",
    pilihan: [
      { teks: "Terlalu banyak pohon ditanam",     benar: false, dampak: "Pohon justru menyerap CO₂." },
      { teks: "Pembakaran bahan bakar fosil",      benar: true,  dampak: "Tepat! Menyumbang 75% emisi global." },
      { teks: "Curah hujan yang tinggi",           benar: false, dampak: "Hujan tak menghasilkan gas rumah kaca." },
      { teks: "Gelombang laut yang besar",         benar: false, dampak: "Laut justru menyerap sebagian CO₂!" },
    ],
  },
  {
    id: 3,
    teks: "Sungai Ciemas tercemar plastik & limbah industri. Kebijakan terbaik?",
    pilihan: [
      { teks: "Biarkan industri buang limbah asal bayar denda", benar: false, dampak: "Ekosistem sungai terus rusak." },
      { teks: "Bangun bank sampah & program daur ulang",        benar: true,  dampak: "Plastik berkurang 60%, warga sejahtera!" },
      { teks: "Tutup sungai dengan beton",                     benar: false, dampak: "Masalah disembunyikan, bukan diselesaikan." },
      { teks: "Alihkan aliran sungai ke hutan",                benar: false, dampak: "Hutan ikut tercemar, bencana meluas." },
    ],
  },
  {
    id: 4,
    teks: "Ruang hijau kota hanya 3%, jauh di bawah standar WHO 30%. Apa kebijakanmu?",
    pilihan: [
      { teks: "Ubah taman kota jadi lahan parkir",    benar: false, dampak: "Suhu kota naik, paru-paru kota hilang." },
      { teks: "Program Satu Warga Satu Pohon",        benar: true,  dampak: "Suhu turun 2°C, udara lebih segar!" },
      { teks: "Bangun mal baru di lahan terbuka",     benar: false, dampak: "RTH makin berkurang, UHI memburuk." },
      { teks: "Biarkan lahan kosong tak terkelola",   benar: false, dampak: "Lahan jadi TPS liar dan kumuh." },
    ],
  },
  {
    id: 5,
    teks: "Sampah organik dapur paling tepat dimanfaatkan untuk...",
    pilihan: [
      { teks: "Dibuang ke sungai agar hanyut",          benar: false, dampak: "Mencemari perairan, ikan mati." },
      { teks: "Dibakar di halaman setiap hari",         benar: false, dampak: "Dioksin berbahaya bagi paru-paru." },
      { teks: "Dijadikan kompos / pupuk organik",       benar: true,  dampak: "Mengurangi sampah TPA hingga 30%!" },
      { teks: "Dicampur plastik dalam satu kantong",    benar: false, dampak: "Proses daur ulang jadi lebih sulit." },
    ],
  },
  {
    id: 6,
    teks: "Cara paling efektif mengurangi jejak karbon harian adalah...",
    pilihan: [
      { teks: "Selalu pakai kendaraan pribadi",                    benar: false, dampak: "Emisi meningkat, kemacetan bertambah." },
      { teks: "Bersepeda, jalan kaki, atau naik angkutan umum",   benar: true,  dampak: "Emisi pribadimu bisa turun 70%!" },
      { teks: "Biarkan elektronik menyala semalaman",             benar: false, dampak: "Boros energi, emisi terus keluar." },
      { teks: "Beli baju baru tiap minggu (fast fashion)",        benar: false, dampak: "10% emisi karbon global dari tekstil." },
    ],
  },
];

const FAKTA = [
  { icon: "", judul: "Plastik di Laut",     isi: "Setiap tahun 8 juta ton plastik masuk ke laut. Pada 2050, plastik bisa melebihi jumlah ikan!" },
  { icon: "", judul: "Kekuatan Pohon",      isi: "Satu pohon dewasa menyerap hingga 22 kg CO2 per tahun — investasi nyata untuk bumi." },
  { icon: "", judul: "Energi Surya",        isi: "Indonesia terima sinar matahari sepanjang tahun. Panel surya bisa penuhi kebutuhan listrik rumah tangga." },
  { icon: "", judul: "Transportasi Publik", isi: "Satu bus penuh menggantikan 40 mobil pribadi — kurangi kemacetan dan emisi sekaligus." },
  { icon: "", judul: "Daur Ulang Kertas",   isi: "Mendaur ulang 1 ton kertas menyelamatkan 17 pohon dan menghemat 26.000 liter air bersih." },
];

/* ─── UTIL ──────────────────────────────────────────────── */
const acakArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

/* ─── LAYAR INTRO ───────────────────────────────────────── */
function LayarIntro({ onMulai, onBack }) {
  return (
    <div style={gaya.introWrap}>
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "rgba(255,255,255,0.1)",
            border: "2px solid rgba(255,255,255,0.2)",
            borderRadius: 12,
            padding: "10px 18px",
            color: "white",
            fontSize: 14,
            fontWeight: 900,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            transition: "all 0.2s",
            zIndex: 100,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ← Kembali
        </button>
      )}

      <span style={gaya.levelBadge}>LEVEL 2</span>
      <div style={{ fontSize: 60, margin: "16px 0 8px" }}>🌿</div>
      <h1 style={gaya.introJudul}>EcoMission</h1>
      <p style={gaya.introSub}>Selamatkan Kota Hijau</p>

      <div style={gaya.introBox}>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>
          Kamu adalah <b style={{ color: "#FFC107" }}>Duta Lingkungan</b>. Pilih kebijakan yang tepat
          untuk memulihkan kota dari polusi, sampah, dan krisis ruang hijau.
        </p>
      </div>

      <div style={gaya.statGrid}>
        {["90 Detik", "6 Soal", "+10 Benar", "-5 Salah"].map((lb) => (
          <div key={lb} style={gaya.statItem}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 800 }}>{lb}</span>
          </div>
        ))}
      </div>

      <button style={gaya.tombolMulai}
        onClick={onMulai}
        onTouchEnd={onMulai}
        onTouchStart={e => e.currentTarget.style.transform = "translateY(4px)"}
      >
        MULAI MISI!
      </button>
    </div>
  );
}

/* ─── LAYAR SOAL ────────────────────────────────────────── */
function LayarSoal({ soal, nomor, total, waktu, skor, onJawab }) {
  const [dipilih, setDipilih]   = useState(null);
  const [terbuka, setTerbuka]   = useState(false);
  const [animSkor, setAnimSkor] = useState(null);

  const pilihJawaban = useCallback((i) => {
    if (terbuka) return;
    const p = soal.pilihan[i];
    setDipilih(i);
    setTerbuka(true);
    setAnimSkor(p.benar ? `+${SKOR_BENAR}` : `${SKOR_SALAH}`);
    setTimeout(() => {
      setDipilih(null);
      setTerbuka(false);
      setAnimSkor(null);
      onJawab(p.benar, p.dampak);
    }, 1800);
  }, [terbuka, soal, onJawab]);

  const pctWaktu    = (waktu / DURASI_LEVEL) * 100;
  const warnaTimer  = waktu > 30 ? "#48A111" : waktu > 15 ? "#F2B50B" : "#ef4444";
  const jawabanBenar = terbuka ? soal.pilihan.findIndex(p => p.benar) : -1;

  return (
    <div style={gaya.soalRoot}>
      {/* Top bar */}
      <div style={gaya.topBar}>
        <div style={gaya.topPill}>{skor <= 0 ? 0 : Math.floor(skor / SKOR_BENAR)}</div>
        <div style={{ ...gaya.topPill, color: warnaTimer, fontSize: 18, fontWeight: 900 }}>
          {waktu}<span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>s</span>
        </div>
        <div style={{ ...gaya.topPill, color: skor >= 0 ? "#48A111" : "#ef4444", fontWeight: 900 }}>
          {skor >= 0 ? "+" : ""}{skor}
        </div>
      </div>

      {/* Timer bar */}
      <div style={gaya.timerBarTrack}>
        <div style={{
          height: "100%", borderRadius: 99, width: `${pctWaktu}%`,
          background: warnaTimer, transition: "width 1s linear, background 0.4s",
        }} />
      </div>

      {/* Progres dots */}
      <div style={gaya.dots}>
        {[...Array(total)].map((_, i) => (
          <div key={i} style={{
            ...gaya.dot,
            background: i < nomor - 1 ? "#48A111" : i === nomor - 1 ? "#F2B50B" : "rgba(255,255,255,0.12)",
          }} />
        ))}
      </div>

      {/* Nomor soal */}
      <div style={gaya.nomorBadge}>{nomor}/{total}</div>

      {/* Kartu soal */}
      <div style={gaya.soalKartu}>
        <p style={gaya.soalTeks}>{soal.teks}</p>
      </div>

      {/* Skor animasi */}
      {animSkor && (
        <div style={{
          ...gaya.animSkorWrap,
          color: animSkor.startsWith("+") ? "#48A111" : "#ef4444",
        }}>
          {animSkor}
        </div>
      )}

      {/* Pilihan jawaban */}
      <div style={gaya.pilihanWrap}>
        {soal.pilihan.map((p, i) => {
          const warna          = WARNA_TOMBOL[i % WARNA_TOMBOL.length];
          const iniDipilih     = dipilih === i;
          const iniBenar       = p.benar;
          const bgAkhir        = !terbuka ? warna.bg
                               : iniBenar ? "#48A111"
                               : iniDipilih ? "#ef4444"
                               : warna.bg;
          const shadowAkhir    = !terbuka ? warna.shadow
                               : iniBenar ? "#25671E"
                               : iniDipilih ? "#b91c1c"
                               : warna.shadow;
          const opacity        = terbuka && !iniBenar && !iniDipilih ? 0.35 : 1;
          const translateY     = iniDipilih && terbuka ? "4px" : "0px";

          return (
            <button
              key={i}
              onClick={() => pilihJawaban(i)}
              onTouchEnd={() => pilihJawaban(i)}
              disabled={terbuka}
              style={{
                ...gaya.tombolJawaban,
                background: bgAkhir,
                boxShadow: `0 6px 0 ${shadowAkhir}`,
                opacity,
                transform: `translateY(${translateY})`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={gaya.hurufJawaban}>{["A","B","C","D"][i]}</span>
                <span style={gaya.teksPilihan}>{p.teks}</span>
              </div>
              {terbuka && (iniBenar || iniDipilih) && (
                <div style={gaya.dampakTeks}>{p.dampak}</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Banner benar/salah */}
      {terbuka && dipilih !== null && (
        <div style={{
          ...gaya.banner,
          background: soal.pilihan[dipilih].benar ? "#48A111" : "#c62828",
        }}>
          {soal.pilihan[dipilih].benar ? "✓  Benar!" : "✗  Salah"}
        </div>
      )}
    </div>
  );
}

/* ─── LAYAR HASIL ───────────────────────────────────────── */
function LayarHasil({ skor, selesai, onUlangi, onBack }) {
  const benar  = selesai.filter(s => s.benar).length;
  const fakta3 = acakArray(FAKTA).slice(0, 3);

  return (
    <div style={gaya.hasilRoot}>
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "rgba(255,255,255,0.1)",
            border: "2px solid rgba(255,255,255,0.2)",
            borderRadius: 12,
            padding: "10px 18px",
            color: "white",
            fontSize: 14,
            fontWeight: 900,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            transition: "all 0.2s",
            zIndex: 100,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ← Kembali
        </button>
      )}
      
      <div style={{ textAlign: "center", padding: "28px 16px 16px" }}>
        <div style={{ fontSize: 58 }}>{benar >= 5 ? "🏆" : benar >= 3 ? "⭐" : "🌱"}</div>
        <h2 style={{ fontWeight: 900, fontSize: 24, margin: "10px 0 4px" }}>Level 2 Selesai!</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
          {benar >= 5 ? "Kamu pemimpin lingkungan sejati!" : benar >= 3 ? "Kota Hijau bangga punya kamu!" : "Terus belajar untuk bumi lebih baik!"}
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, padding: "0 16px 20px" }}>
        {[
          { label: "SKOR",    nilai: skor >= 0 ? `+${skor}` : `${skor}`, warna: skor >= 0 ? "#48A111" : "#ef4444" },
          { label: "BENAR",   nilai: `${benar}/${DAFTAR_SOAL.length}`,   warna: "#F2B50B" },
          { label: "BINTANG", nilai: benar >= 5 ? "3 Bintang" : benar >= 3 ? "2 Bintang" : "1 Bintang", warna: "#F2B50B" },
        ].map(({ label, nilai, warna }) => (
          <div key={label} style={gaya.statHasil}>
            <div style={{ fontSize: 18, fontWeight: 900, color: warna }}>{nilai}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 800 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 16px" }}>
        <p style={gaya.seksiLabel}>REVIEW JAWABAN</p>
        {selesai.map((s2, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 12, marginBottom: 8,
            background: s2.benar ? "rgba(72,161,17,0.12)" : "rgba(239,68,68,0.1)",
            borderLeft: `4px solid ${s2.benar ? "#48A111" : "#ef4444"}`,
          }}>
            <span style={{ fontSize: 18 }}>{s2.benar ? "✓" : "✗"}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Soal {i + 1}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: s2.benar ? "#48A111" : "#fca5a5" }}>{s2.dampak}</div>
            </div>
            <b style={{ fontSize: 13, color: s2.benar ? "#48A111" : "#ef4444" }}>
              {s2.benar ? `+${SKOR_BENAR}` : `${SKOR_SALAH}`}
            </b>
          </div>
        ))}
      </div>

      <div style={{ padding: "12px 16px" }}>
        <p style={gaya.seksiLabel}>FAKTA LINGKUNGAN</p>
        {fakta3.map((f, i) => (
          <div key={i} style={gaya.faktaKartu}>
            <p style={{ fontWeight: 800, color: "#F2B50B", fontSize: 13, margin: "0 0 4px" }}>{f.judul}</p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, lineHeight: 1.6, margin: 0 }}>{f.isi}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: "4px 16px 40px" }}>
        <button
          onClick={onUlangi} onTouchEnd={onUlangi}
          style={{ ...gaya.tombolMulai, background: "#25671E", boxShadow: "0 6px 0 #1a4a1a" }}
        >
          MAIN LAGI
        </button>
      </div>
    </div>
  );
}

/* ─── LAYAR WAKTU HABIS ─────────────────────────────────── */
function LayarHabis({ skor, onUlangi, onBack }) {
  return (
    <div style={{ ...gaya.introWrap, paddingTop: 80 }}>
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "rgba(255,255,255,0.1)",
            border: "2px solid rgba(255,255,255,0.2)",
            borderRadius: 12,
            padding: "10px 18px",
            color: "white",
            fontSize: 14,
            fontWeight: 900,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            transition: "all 0.2s",
            zIndex: 100,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ← Kembali
        </button>
      )}
      
      <div style={{ fontSize: 64, marginBottom: 16 }}>⏱️</div>
      <h2 style={{ fontWeight: 900, fontSize: 26, color: "#F2B50B", margin: "0 0 8px" }}>Waktu Habis!</h2>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 36 }}>
        Kamu dapat <b style={{ color: "#48A111" }}>{skor} poin</b> kali ini.
      </p>
      <button
        onClick={onUlangi} onTouchEnd={onUlangi}
        style={{ ...gaya.tombolMulai, background: "#B8860B", boxShadow: "0 6px 0 #8B6508", maxWidth: 260 }}
      >
        COBA LAGI
      </button>
    </div>
  );
}

/* ─── KOMPONEN UTAMA ────────────────────────────────────── */
export default function EcoMissionLevel2({ onBack }) {
  const [fase, setFase]       = useState("intro");
  const [urutan, setUrutan]   = useState([]);
  const [nomor, setNomor]     = useState(0);
  const [skor, setSkor]       = useState(0);
  const [waktu, setWaktu]     = useState(DURASI_LEVEL);
  const [selesai, setSelesai] = useState([]);
  const refTimer              = useRef(null);

  useEffect(() => {
    if (fase !== "intro") localStorage.setItem("score2", skor);
  }, [skor, fase]);

  const mulaiPermainan = useCallback(() => {
    const soalAcak = acakArray(DAFTAR_SOAL).map(q => ({ ...q, pilihan: acakArray(q.pilihan) }));
    setUrutan(soalAcak);
    setNomor(0); setSkor(0);
    setWaktu(DURASI_LEVEL); setSelesai([]);
    setFase("bermain");
  }, []);

  useEffect(() => {
    if (fase !== "bermain") { clearInterval(refTimer.current); return; }
    refTimer.current = setInterval(() => {
      setWaktu(w => {
        if (w <= 1) { clearInterval(refTimer.current); setFase("habis"); return 0; }
        return w - 1;
      });
    }, 1000);
    return () => clearInterval(refTimer.current);
  }, [fase]);

  const tanganiJawaban = useCallback((benar, dampak) => {
    setSkor(s => s + (benar ? SKOR_BENAR : SKOR_SALAH));
    setSelesai(prev => [...prev, { benar, dampak }]);
    setNomor(n => {
      const berikutnya = n + 1;
      if (berikutnya >= urutan.length) { clearInterval(refTimer.current); setFase("selesai"); }
      return berikutnya;
    });
  }, [urutan.length]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body, html { background: #1a0a2e; overscroll-behavior: none; }
        @keyframes masuk    { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:none; } }
        @keyframes animSkor { 0%{opacity:0;transform:scale(.5)translateY(10px)} 55%{opacity:1;transform:scale(1.4)translateY(-18px)} 100%{opacity:0;transform:scale(1)translateY(-40px)} }
        @keyframes slideUp  { from { transform:translateY(100%); } to { transform:translateY(0); } }
      `}</style>
      <div style={gaya.root}>
        {fase === "intro"   && <LayarIntro   onMulai={mulaiPermainan} onBack={onBack} />}
        {fase === "bermain" && urutan[nomor] && (
          <LayarSoal
            soal={urutan[nomor]} nomor={nomor + 1}
            total={urutan.length} waktu={waktu}
            skor={skor} onJawab={tanganiJawaban}
          />
        )}
        {fase === "selesai" && <LayarHasil skor={skor} selesai={selesai} onUlangi={mulaiPermainan} onBack={onBack} />}
        {fase === "habis"   && <LayarHabis  skor={skor} onUlangi={mulaiPermainan} onBack={onBack} />}
      </div>
    </>
  );
}

/* ─── GAYA ──────────────────────────────────────────────── */
const gaya = {
  root: {
    minHeight: "100dvh",
    background: "linear-gradient(180deg, #25671E 0%, #48A111 45%, #1a4a1a 100%)",
    fontFamily: "'Nunito', sans-serif",
    color: "#fff",
    overscrollBehavior: "none",
  },

  /* Intro */
  introWrap: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", minHeight: "100dvh",
    padding: "32px 20px", textAlign: "center",
    animation: "masuk 0.5s ease-out",
  },
  levelBadge: {
    background: "rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.5)",
    fontSize: 11, fontWeight: 900, letterSpacing: 3,
    padding: "5px 16px", borderRadius: 99,
  },
  introJudul: {
    fontSize: "clamp(28px,8vw,42px)", fontWeight: 900,
    background: "linear-gradient(135deg, #F2B50B, #F7F0F0)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    margin: "8px 0 4px",
  },
  introSub: { color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 28 },
  introBox: {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16, padding: "14px 16px", marginBottom: 24,
    maxWidth: 380, width: "100%",
  },
  statGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: 10, width: "100%", maxWidth: 380, marginBottom: 32,
  },
  statItem: {
    background: "rgba(255,255,255,0.07)", borderRadius: 12,
    padding: "10px 6px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 4,
  },
  tombolMulai: {
    width: "100%", maxWidth: 380, padding: "17px 24px",
    borderRadius: 16, border: "none", cursor: "pointer",
    background: "#48A111", color: "#fff", fontSize: 18, fontWeight: 900,
    boxShadow: "0 8px 0 #25671E", letterSpacing: 1,
    transition: "transform 0.1s",
  },

  /* Soal */
  soalRoot: {
    display: "flex", flexDirection: "column",
    minHeight: "100dvh",
  },
  topBar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "14px 16px 0",
  },
  topPill: {
    background: "rgba(37,103,30,0.6)", borderRadius: 99,
    padding: "6px 14px", fontSize: 14, fontWeight: 900,
  },
  timerBarTrack: {
    height: 6, margin: "10px 16px", borderRadius: 99,
    background: "rgba(255,255,255,0.08)", overflow: "hidden",
  },
  dots: { display: "flex", gap: 5, padding: "0 16px 6px" },
  dot:  { flex: 1, height: 4, borderRadius: 99 },
  nomorBadge: {
    alignSelf: "center",
    background: "rgba(72,161,17,0.55)", color: "#F2B50B",
    fontWeight: 900, fontSize: 14, padding: "5px 20px",
    borderRadius: 99, letterSpacing: 1, marginBottom: -2,
  },
  soalKartu: {
    margin: "6px 14px 0",
    background: "rgba(0,0,0,0.35)",
    borderRadius: 20, padding: "20px 18px",
  },
  soalTeks: {
    fontSize: "clamp(15px,4.5vw,20px)", fontWeight: 800,
    lineHeight: 1.5, textAlign: "center",
  },
  animSkorWrap: {
    alignSelf: "center", fontSize: 54, fontWeight: 900,
    animation: "animSkor 1.5s ease-out forwards",
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
    pointerEvents: "none",
  },
  pilihanWrap: {
    display: "flex", flexDirection: "column", gap: 10,
    padding: "12px 12px 0", marginTop: "auto",
  },
  tombolJawaban: {
    width: "100%", border: "none", borderRadius: 16,
    padding: "13px 16px", cursor: "pointer", textAlign: "left",
    color: "#fff", transition: "opacity 0.25s, transform 0.15s",
  },
  hurufJawaban: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    background: "rgba(255,255,255,0.25)", borderRadius: 8,
    width: 26, height: 26, fontSize: 12, fontWeight: 900, flexShrink: 0,
  },
  teksPilihan: {
    fontSize: "clamp(13px,3.8vw,15px)", fontWeight: 800, lineHeight: 1.3, flex: 1,
  },
  dampakTeks: {
    fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 6, paddingLeft: 36,
  },
  banner: {
    position: "sticky", bottom: 0, padding: "18px",
    textAlign: "center", fontSize: 18, fontWeight: 900,
    letterSpacing: 1, animation: "slideUp 0.2s ease-out",
    marginTop: 8,
  },

  /* Hasil */
  hasilRoot: {
    minHeight: "100dvh", overflowY: "auto",
    animation: "masuk 0.5s ease-out",
  },
  statHasil: {
    flex: 1, background: "rgba(255,255,255,0.07)", borderRadius: 14,
    padding: "12px 8px", textAlign: "center",
  },
  seksiLabel: {
    fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.3)",
    letterSpacing: 2, marginBottom: 10, textTransform: "uppercase",
  },
  faktaKartu: {
    background: "rgba(242,181,11,0.15)",
    borderLeft: "4px solid #F2B50B",
    borderRadius: 12, padding: "10px 14px", marginBottom: 10,
  },
};
