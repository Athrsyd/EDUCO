import { useState, useEffect } from "react";
import dataIcon from "../../../assets/Data/icon";
import { Link, useNavigate } from "react-router-dom";

const LOGIN_BG = "/bg-new.jpg";

export default function Auth({ onBack }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const icons = dataIcon({ size: 16, color: "#25671E" });
  const navigate = useNavigate();
  const dataLogin = {
    guru: {
      username: "kopling",
      email: "guru@example.com",
      password: "guru123"
    },
    siswa: {
      username: "Dapa",
      email: "siswa@example.com",
      password: "siswa123"
    }
  };
  const checkLogin = () => {
    if (email === dataLogin.guru.email && password === dataLogin.guru.password) {
      navigate('/guru/dashboard');
      localStorage.setItem('userRole', 'guru');
    } else if (email === dataLogin.siswa.email && password === dataLogin.siswa.password) {
      navigate('/siswa/dashboard');
      localStorage.setItem('userRole', 'siswa');
    }
    else {
      alert("Email atau password salah!");
    }
  };
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleLoginSubmit = () => {
    checkLogin();
    console.log("Login submitted:", { username, email });
  };

  const handleRegisterSubmit = () => {
    console.log("Register submitted:", { username, email, password });
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-20">
      <img
        src={LOGIN_BG}
        alt="Login background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />

      <Link to="/">
        <button
          onClick={() => onBack?.()}
          className="absolute left-6 top-6 z-50 flex items-center gap-1 rounded-full border border-transparent bg-white px-4 py-1.5 text-sm font-medium text-[#25671E] shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        >
          <span className="text-base">←</span>
          Kembali
        </button>
      </Link>

      <div
        className={`relative z-10 h-[70vh] w-full max-w-170 overflow-hidden rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
      >
        <div
          className={`flex h-full w-[200%] transition-transform duration-700 ease-in-out ${isRegister ? "-translate-x-1/2" : "translate-x-0"
            }`}
        >
          <div className="flex h-full w-1/2">
            <div className="flex w-full flex-col items-center justify-center border border-white/60 bg-white/35 p-8 backdrop-blur-2xl md:w-1/2 md:p-10">
              <h2 className="mb-5 text-center text-2xl font-bold text-white md:text-[1.5rem]">
                Login
              </h2>

              {isRegister && (
                <div className="relative mb-3.5 w-full">
                <span className="z-50 pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E4D2B]">
                  {icons.user}
                </span>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-full border border-white/70 bg-white/30 py-2.5 pl-12 pr-3.5 text-sm text-secondary backdrop-blur-sm outline-none transition-shadow duration-300 placeholder:text-secondary/70 focus-visible:shadow-[0_0_0_3px_rgba(72,161,17,0.4)]"
                />
              </div>
              )}

              <div className="relative mb-3.5 w-full">
                <span className="z-50 pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E4D2B]">
                  {icons.mail}
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border border-white/70 bg-white/30 py-2.5 pl-12 pr-3.5 text-sm text-secondary backdrop-blur-sm outline-none transition-shadow duration-300 placeholder:text-secondary/70 focus-visible:shadow-[0_0_0_3px_rgba(72,161,17,0.4)]"
                />
              </div>

              <div className="relative mb-3.5 w-full">
                <span className="z-50 pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E4D2B]">
                  {icons.lock}
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full border border-white/70 bg-white/30 py-2.5 pl-12 pr-3.5 text-sm text-secondary backdrop-blur-sm outline-none transition-shadow duration-300 placeholder:text-secondary/70 focus-visible:shadow-[0_0_0_3px_rgba(72,161,17,0.4)]"
                />
              </div>

              <button
                onClick={handleLoginSubmit}
                className="mt-4 w-full cursor-pointer rounded-full bg-[#48A111] px-8 py-2.5 text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#3d8a0e]"
              >
                Login
              </button>
            </div>

            <div className="relative hidden w-1/2 flex-col items-center justify-center bg-[#48A111] p-10 md:flex">
              <h2 className="text-center text-2xl font-bold leading-tight text-white">
                Selamat datang kembali
              </h2>

              <p className="mt-3 text-center text-[13px] leading-relaxed text-white/90">
                Silahkan isi email beserta password yang anda daftarkan
                <br />
                Belum punya akun ?
              </p>

              <button
                onClick={() => setIsRegister(true)}
                className="mt-5 cursor-pointer rounded-full border-2 border-white bg-transparent px-10 py-2.5 text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white hover:text-[#48A111]"
              >
                Register
              </button>
            </div>
          </div>

          <div className="flex h-full w-1/2">
            <div className="relative hidden w-1/2 flex-col items-center justify-center bg-[#48A111] p-10 md:flex">
              <h2 className="text-center text-2xl font-bold leading-tight text-white">
                Ayo bergabung sekarang
              </h2>

              <p className="mt-3 text-center text-[13px] leading-relaxed text-white/90">
                Buat akun EDUCO untuk mulai belajar bersama kami.
                <br />
                Sudah punya akun ?
              </p>

              <button
                onClick={() => setIsRegister(false)}
                className="mt-5 cursor-pointer rounded-full border-2 border-white bg-transparent px-10 py-2.5 text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white hover:text-[#48A111]"
              >
                Login
              </button>
            </div>

            <div className="flex w-full flex-col items-center justify-center border border-white/60 bg-white/35 p-8 backdrop-blur-2xl md:w-1/2 md:p-10">
              <h2 className="mb-5 text-center text-2xl font-bold text-white md:text-[1.5rem]">
                Register
              </h2>

              <div className="relative mb-3.5 w-full">
                <span className="z-50 pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E4D2B]">
                  {icons.user}
                </span>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-full border border-white/70 bg-white/30 py-2.5 pl-12 pr-3.5 text-sm text-secondary backdrop-blur-sm outline-none transition-shadow duration-300 placeholder:text-secondary/70 focus-visible:shadow-[0_0_0_3px_rgba(72,161,17,0.4)]"
                />
              </div>

              <div className="relative mb-3.5 w-full">
                <span className="z-50 pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E4D2B]">
                  {icons.mail}
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border border-white/70 bg-white/30 py-2.5 pl-12 pr-3.5 text-sm text-secondary backdrop-blur-sm outline-none transition-shadow duration-300 placeholder:text-secondary/70 focus-visible:shadow-[0_0_0_3px_rgba(72,161,17,0.4)]"
                />
              </div>

              <div className="relative mb-3.5 w-full">
                <span className="z-50 pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E4D2B]">
                  {icons.lock}
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full border border-white/70 bg-white/30 py-2.5 pl-12 pr-3.5 text-sm text-secondary backdrop-blur-sm outline-none transition-shadow duration-300 placeholder:text-secondary/70 focus-visible:shadow-[0_0_0_3px_rgba(72,161,17,0.4)]"
                />
              </div>

              <button
                onClick={handleRegisterSubmit}
                className="mt-4 w-full cursor-pointer rounded-full bg-[#48A111] px-8 py-2.5 text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#3d8a0e]"
              >
                Daftar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
