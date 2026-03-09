import { useState, useEffect } from "react";

const REG_BG =
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80";

export default function Register({ onBack }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = () => {
    console.log("Register submitted:", { username, email, password });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .card-enter {
          animation: fadeSlideUp 0.6s ease-out both;
        }

        .panel-left-enter {
          animation: slideFromLeft 0.7s ease-out 0.15s both;
        }

        .panel-right-enter {
          animation: slideFromRight 0.7s ease-out 0.3s both;
        }

        .input-glow:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(72, 161, 17, 0.4);
        }

        .btn-hover {
          transition: all 0.3s ease;
        }

        .btn-hover:hover {
          transform: scale(1.05);
        }

        .back-btn {
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
          transform: translateY(-1px);
        }

        .outline-btn {
          transition: all 0.3s ease;
        }

        .outline-btn:hover {
          background: #fff;
          color: #48A111;
          transform: scale(1.05);
        }
      `}</style>

      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${REG_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
          }}
        />

        <button
          className="back-btn"
          onClick={onBack}
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "#fff",
            color: "#25671E",
            fontWeight: 500,
            fontSize: 14,
            borderRadius: 9999,
            padding: "6px 18px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            zIndex: 50,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <span style={{ fontSize: 16 }}>←</span> Kembali
        </button>

        <div
          className={mounted ? "card-enter" : ""}
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            maxWidth: 680,
            minHeight: 380,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)",
            opacity: mounted ? undefined : 0,
          }}
        >
          <div
            className={mounted ? "panel-left-enter" : ""}
            style={{
              width: "50%",
              background: "#48A111",
              borderRadius: "24px 0 0 24px",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 20,
                left: 24,
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: 1,
              }}
            >
              🍃DUCO
            </span>

            <h2
              style={{
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "#fff",
                textAlign: "center",
                marginTop: 16,
              }}
            >
              Registrasi
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: 13,
                textAlign: "center",
                marginTop: 10,
                lineHeight: 1.6,
              }}
            >
              Ayo jadilah bagian dari EDUCO dengan mendaftar.
              <br />
              Sudah punya akun ?
            </p>

            <button
              className="outline-btn btn-hover"
              style={{
                marginTop: 24,
                padding: "10px 40px",
                borderRadius: 9999,
                background: "transparent",
                border: "2px solid #fff",
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Login
            </button>
          </div>

          <div
            className={mounted ? "panel-right-enter" : ""}
            style={{
              width: "50%",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2
              style={{
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "#48A111",
                textAlign: "center",
                marginBottom: 18,
              }}
            >
              Buat Akun
            </h2>

            <div style={{ position: "relative", marginBottom: 12 }}>
              <svg
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 18,
                  height: 18,
                  opacity: 0.7,
                }}
                fill="none"
                stroke="#25671E"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                className="input-glow"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 42px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.4)",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(4px)",
                  color: "#25671E",
                  fontSize: 14,
                  fontFamily: "'Poppins', sans-serif",
                }}
              />
            </div>

            <div style={{ position: "relative", marginBottom: 12 }}>
              <svg
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 18,
                  height: 18,
                  opacity: 0.7,
                }}
                fill="none"
                stroke="#25671E"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4l-10 8L2 4" />
              </svg>
              <input
                className="input-glow"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 42px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.4)",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(4px)",
                  color: "#25671E",
                  fontSize: 14,
                  fontFamily: "'Poppins', sans-serif",
                }}
              />
            </div>

            <div style={{ position: "relative", marginBottom: 12 }}>
              <svg
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 18,
                  height: 18,
                  opacity: 0.7,
                }}
                fill="none"
                stroke="#25671E"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input
                className="input-glow"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 42px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.4)",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(4px)",
                  color: "#25671E",
                  fontSize: 14,
                  fontFamily: "'Poppins', sans-serif",
                }}
              />
            </div>

            <button
              className="btn-hover"
              onClick={handleSubmit}
              style={{
                marginTop: 14,
                width: "100%",
                padding: "10px 32px",
                borderRadius: 9999,
                background: "#48A111",
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Daftar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
