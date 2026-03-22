// level1.jsx — Pilah Sampah! | Fullscreen · Landscape Only · Backsound
// Asset paths (relative ke /public):
// public/item/background.png
// public/item/apel.png, burger.png, pizza.png
// public/item/botol.png, sendal.png, kaleng.png
// public/item/baterai.png, oli.png, aki.png
// public/item/tempatSampahOrganik.png
// public/item/tempatSampahAnorganik.png
// public/item/tempatSampahB3.png
// public/item/backsound.mp3

import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const ITEMS_DATA = [
  { id: "apel",    name: "Apel",    emoji: "🍎", cat: "organik"   },
  { id: "burger",  name: "Burger",  emoji: "🍔", cat: "organik"   },
  { id: "pizza",   name: "Pizza",   emoji: "🍕", cat: "organik"   },
  { id: "botol",   name: "Botol",   emoji: "🍶", cat: "anorganik" },
  { id: "sendal",  name: "Sendal",  emoji: "👡", cat: "anorganik" },
  { id: "kaleng",  name: "Kaleng",  emoji: "🥫", cat: "anorganik" },
  { id: "baterai", name: "Baterai", emoji: "🔋", cat: "b3"        },
  { id: "oli",     name: "Oli",     emoji: "🛢️", cat: "b3"        },
  { id: "aki",     name: "Aki",     emoji: "⚡", cat: "b3"        },
];

const BINS_CFG = [
  {
    cat:    "organik",
    label:  "Organik",
    icon:   "🌿",
    color:  "#15803d",
    light:  "#f0fdf4",
    glow:   "#4ade80",
    border: "#86efac",
    img:    "/item/tempatSampahOrganik.png",
  },
  {
    cat:    "anorganik",
    label:  "Anorganik",
    icon:   "♻️",
    color:  "#1d4ed8",
    light:  "#eff6ff",
    glow:   "#60a5fa",
    border: "#93c5fd",
    img:    "/item/tempatSampahAnorganik.png",
  },
  {
    cat:    "b3",
    label:  "B3 (Berbahaya)",
    icon:   "☣️",
    color:  "#b91c1c",
    light:  "#fff1f2",
    glow:   "#f87171",
    border: "#fca5a5",
    img:    "/item/tempatSampahB3.png",
  },
];

const FALL_SPEED = 92;
const GAME_TIME  = 75; // Ditingkatkan dari 60s ke 75s agar lebih mudah mencapai score tinggi
const MAX_ITEMS  = 30;

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function makeQueue() {
  const pool = [];
  for (let i = 0; i < 4; i++) pool.push(...ITEMS_DATA);
  return shuffle(pool).slice(0, MAX_ITEMS);
}

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { overflow: hidden; width: 100%; height: 100%; }

@keyframes floatScore {
  0%   { opacity: 1; transform: translateY(0)     scale(1);    }
  80%  { opacity: 1; transform: translateY(-70px)  scale(1.15); }
  100% { opacity: 0; transform: translateY(-88px)  scale(1.1);  }
}
@keyframes popIn {
  0%   { transform: scale(0.1) rotate(-20deg); opacity: 0; }
  68%  { transform: scale(1.18) rotate(4deg);  opacity: 1; }
  100% { transform: scale(1)   rotate(0deg);   opacity: 1; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0);    }
  50%       { transform: translateY(-14px); }
}
@keyframes wiggle {
  0%,100% { transform: translateX(0); }
  22%,66% { transform: translateX(-4px); }
  44%,88% { transform: translateX(4px); }
}
@keyframes timerBlink {
  0%,100% { opacity: 1;    }
  50%      { opacity: 0.45; }
}
@keyframes rotatePulse {
  0%   { transform: rotate(0deg)  scale(1);    }
  45%  { transform: rotate(90deg) scale(1.08); }
  55%  { transform: rotate(90deg) scale(1.08); }
  100% { transform: rotate(0deg)  scale(1);    }
}
@keyframes flashGreen {
  0%   { background: rgba(74,222,128,0.32); }
  100% { background: transparent; }
}
@keyframes flashRed {
  0%   { background: rgba(248,113,113,0.32); }
  100% { background: transparent; }
}
@keyframes binPop {
  0%   { transform: scaleY(1);    }
  45%  { transform: scaleY(1.04); }
  100% { transform: scaleY(1);    }
}
@keyframes cloudDrift {
  0%,100% { transform: translateX(0); }
  50%      { transform: translateX(18px); }
}
`;

/* ═══════════════════════════════════════════════════════════════
   LANDSCAPE WARNING
═══════════════════════════════════════════════════════════════ */
function LandscapeWarning() {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "linear-gradient(135deg,#052e16 0%,#14532d 60%,#064e3b 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 24, fontFamily: "'Nunito',sans-serif",
    }}>
      <div style={{ fontSize: 80, animation: "rotatePulse 2.2s ease-in-out infinite" }}>📱</div>
      <div style={{ textAlign: "center", color: "white", lineHeight: 1.5 }}>
        <div style={{ fontSize: 26, fontWeight: 900 }}>Putar layar kamu!</div>
        <div style={{ fontSize: 16, color: "#4ade80", fontWeight: 800, marginTop: 6 }}>
          Mode Lanskap diperlukan untuk bermain 🎮
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Level1({ onBack }) {
  /* ── Viewport ── */
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const upd = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", upd);
    window.addEventListener("orientationchange", () => setTimeout(upd, 150));
    return () => {
      window.removeEventListener("resize", upd);
      window.removeEventListener("orientationchange", upd);
    };
  }, []);

  const VW = vp.w;
  const VH = vp.h;
  const isPortrait = VW < VH;

  /* ── Layout (derived from viewport) ── */
  const HUD_H    = Math.round(Math.min(VH * 0.115, 70));
  const GROUND_H = Math.round(VH * 0.025);
  const BIN_H    = Math.round(Math.min(VH * 0.30, 190));
  const BIN_Y    = VH - BIN_H - GROUND_H;
  const BIN_W    = VW / 3;
  const ITEM_SZ  = Math.round(Math.min(VW * 0.088, VH * 0.145, 92));

  /* Keep latest layout values in a ref so RAF loop never goes stale */
  const layoutRef = useRef({});
  layoutRef.current = { VW, VH, HUD_H, GROUND_H, BIN_H, BIN_Y, BIN_W, ITEM_SZ };

  /* ── Audio ── */
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  function ensureAudio() {
    if (!audioRef.current) {
      const a = new Audio("/item/backsound.mp3");
      a.loop   = true;
      a.volume = 0.45;
      audioRef.current = a;
    }
    if (audioRef.current.paused) audioRef.current.play().catch(() => {});
  }
  function toggleMute() {
    if (audioRef.current) audioRef.current.muted = !audioRef.current.muted;
    setMuted(m => !m);
  }
  useEffect(() => () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
  }, []);

  /* ── Render triggernya ── */
  const [, setTick] = useState(0);
  const rerender = () => setTick(n => n + 1);

  /* ── All mutable game state in one ref — no stale closure issues ── */
  const G = useRef(null);
  if (!G.current) {
    G.current = {
      phase: "start",
      score: 0, timeLeft: GAME_TIME,
      queue: [], idx: 0, item: null,
      feedbacks: [], highlightBin: null,
      lastTs: null, fid: 0, gen: 0,
      scoreAnim: false,
      flashColor: null, flashTs: 0,
      animFrame: null, timerInterval: null,
    };
  }
  const g = G.current;
  const gameRef = useRef(null);

  /* ═══════════════ GAME LOGIC ═══════════════ */
  function spawnNext(gen) {
    if (g.gen !== gen || g.item) return;
    if (g.idx >= g.queue.length) { endGame(); return; }

    const { VW: w, ITEM_SZ: sz } = layoutRef.current;
    const pad = sz * 0.6;
    const x   = pad + Math.random() * (w - pad * 2 - sz);
    g.item = { ...g.queue[g.idx], x, y: -(sz + 24), held: false, dox: 0, doy: 0 };
    rerender();
  }

  function endGame() {
    g.phase = "gameover";
    clearInterval(g.timerInterval);
    cancelAnimationFrame(g.animFrame);
    g.timerInterval = null; g.animFrame = null;
    localStorage.setItem("level1_score", parseInt(g.score, 10));
    if (audioRef.current) audioRef.current.pause();
    rerender();
  }

  function startGame() {
    clearInterval(g.timerInterval);
    cancelAnimationFrame(g.animFrame);
    ensureAudio();

    const ng = g.gen + 1;
    Object.assign(g, {
      phase: "playing", score: 0, timeLeft: GAME_TIME,
      queue: makeQueue(), idx: 0, item: null,
      feedbacks: [], highlightBin: null, lastTs: null,
      fid: 0, gen: ng, scoreAnim: false,
      flashColor: null, flashTs: 0,
      animFrame: null, timerInterval: null,
    });

    g.timerInterval = setInterval(() => {
      g.timeLeft = Math.max(0, g.timeLeft - 1);
      if (g.timeLeft <= 0) endGame();
      else rerender();
    }, 1000);

    (function loop(ts) {
      if (g.phase !== "playing") return;

      if (g.lastTs !== null && g.item && !g.item.held) {
        const dt = (ts - g.lastTs) / 1000;
        g.item.y += FALL_SPEED * dt;
        if (g.item.y > layoutRef.current.VH + 24) {
          g.item = null; g.idx++;
          const cg = g.gen;
          setTimeout(() => spawnNext(cg), 380);
        }
      }

      const now = Date.now();
      g.feedbacks = g.feedbacks.filter(f => now - f.born < 900);
      g.lastTs = ts;
      rerender();
      g.animFrame = requestAnimationFrame(loop);
    })(performance.now());

    setTimeout(() => spawnNext(ng), 420);
    rerender();
  }

  /* ═══════════════ INPUT ═══════════════ */
  function onItemDown(e) {
    e.preventDefault(); e.stopPropagation();
    if (!g.item || g.phase !== "playing") return;
    const cx = e.touches?.[0]?.clientX ?? e.clientX;
    const cy = e.touches?.[0]?.clientY ?? e.clientY;
    g.item.held = true;
    g.item.dox  = cx - g.item.x;
    g.item.doy  = cy - g.item.y;
    rerender();
  }

  function onMove(e) {
    if (!g.item?.held) return;
    const cx = e.touches?.[0]?.clientX ?? e.clientX;
    const cy = e.touches?.[0]?.clientY ?? e.clientY;
    g.item.x = cx - g.item.dox;
    g.item.y = cy - g.item.doy;

    const { BIN_Y: by, BIN_W: bw, ITEM_SZ: sz } = layoutRef.current;
    const icx = g.item.x + sz / 2;
    const icy = g.item.y + sz / 2;
    if (icy > by - 50) {
      const bi = Math.floor(icx / bw);
      g.highlightBin = BINS_CFG[bi]?.cat ?? null;
    } else {
      g.highlightBin = null;
    }
    rerender();
  }

  function onUp() {
    if (!g.item?.held || g.phase !== "playing") return;
    const { BIN_Y: by, BIN_W: bw, ITEM_SZ: sz } = layoutRef.current;
    const icx = g.item.x + sz / 2;
    const icy = g.item.y + sz / 2;

    let droppedBin = null;
    if (icy > by - 50) {
      const bi = Math.floor(icx / bw);
      if (bi >= 0 && bi < 3) droppedBin = BINS_CFG[bi];
    }
    g.item.held = false; g.highlightBin = null;

    if (droppedBin) {
      const ok = droppedBin.cat === g.item.cat;
      g.feedbacks.push({
        id: ++g.fid, text: ok ? "+10 🎉" : "❌ Salah!", ok,
        x: g.item.x + sz / 2, y: g.item.y - 10, born: Date.now(),
      });
      g.flashColor = ok ? "ok" : "bad";
      g.flashTs = Date.now();
      if (ok) {
        g.score += 10; g.scoreAnim = true; g.idx++; g.item = null;
        setTimeout(() => { g.scoreAnim = false; }, 400);
        const cg = g.gen;
        setTimeout(() => spawnNext(cg), 480);
      }
    }
    rerender();
  }

  /* ═══════════════ PORTRAIT GUARD ═══════════════ */
  if (isPortrait) return (<><style>{GLOBAL_CSS}</style><LandscapeWarning /></>);

  /* ── Computed display ── */
  const timerPct   = (g.timeLeft / GAME_TIME) * 100;
  const timerColor = g.timeLeft > 20 ? "#22c55e" : g.timeLeft > 10 ? "#f59e0b" : "#ef4444";
  const showFlash  = Date.now() - g.flashTs < 400;

  /* ── Responsive font scale ── */
  const fs = {
    hudLabel  : Math.round(HUD_H * 0.19),
    hudVal    : Math.round(HUD_H * 0.50),
    hudIcon   : Math.round(HUD_H * 0.46),
    timerNum  : Math.round(HUD_H * 0.38),
    binIcon   : Math.round(Math.min(BIN_H * 0.30, 58)),
    binLabel  : Math.round(Math.min(BIN_H * 0.12, VH * 0.027, 20)),
    binHint   : Math.round(VH * 0.022),
    itemEmoji : Math.round(ITEM_SZ * 0.40),
    itemName  : Math.round(ITEM_SZ * 0.13),
    feedback  : Math.round(VH * 0.028),
    waiting   : Math.round(VH * 0.032),
    treeEmoji : Math.round(VH * 0.036),
  };

  /* ═══════════════ START SCREEN ═══════════════ */
  if (g.phase === "start") {
    return (
      <div style={{
        position: "fixed", inset: 0,
        background: "linear-gradient(160deg,#052e16 0%,#14532d 55%,#064e3b 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Nunito',sans-serif", overflow: "hidden",
      }}>
        <style>{GLOBAL_CSS}</style>
        
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              background: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.3)",
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
              e.currentTarget.style.background = "rgba(255,255,255,0.3)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ← Kembali
          </button>
        )}

        {/* Ambient blobs */}
        <div style={{ position:"absolute", top:"-25%", left:"-8%", width:"50%", height:"80%",
          background:"radial-gradient(circle,rgba(74,222,128,0.13) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-20%", right:"-5%", width:"42%", height:"75%",
          background:"radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: 28, padding: "clamp(20px, 5vw, 30px) clamp(24px, 6vw, 38px)",
          maxWidth: 620, width: "95%",
          maxWidth: "min(620px, 95vw)",
          boxShadow: "0 36px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.15)",
          animation: "fadeUp 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          display: "flex", gap: "clamp(16px, 4vw, 32px)", alignItems: "center",
          flexDirection: "column",
        }}>
          {/* Left */}
          <div style={{ flex: 1, textAlign: "center", width: "100%" }}>
            <div style={{ fontSize: "clamp(40px, 10vw, 60px)", animation: "bounce 1.9s ease-in-out infinite", lineHeight: 1.1 }}>♻️</div>
            <h1 style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 900, color: "#052e16", margin: "8px 0 6px", lineHeight: 1.2 }}>
              Pilah Sampah!
            </h1>
            <p style={{ color: "#475569", fontSize: "clamp(12px, 3.5vw, 16px)", lineHeight: 1.6, marginBottom: 18 }}>
              Drag sampah ke tempat yang <strong>benar</strong><br />
              <span style={{ color: "#15803d", fontWeight: 900 }}>30 item × 10 poin = maks 300 poin</span>
            </p>
            <button onClick={startGame} style={{
              background: "linear-gradient(135deg,#16a34a,#166534)",
              color: "white", border: "none", borderRadius: 14,
              padding: "clamp(12px, 3vw, 13px) 0", fontSize: "clamp(14px, 4vw, 18px)", fontWeight: 900,
              cursor: "pointer", width: "100%",
              boxShadow: "0 4px 16px rgba(22,163,74,0.4)",
              transition: "transform 0.12s,box-shadow 0.12s",
              minHeight: "48px",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(22,163,74,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 4px 16px rgba(22,163,74,0.4)"; }}
            >
              Mulai Main!
            </button>
            <p style={{ color: "#94a3b8", fontSize: "clamp(11px, 3vw, 14px)", marginTop: 10 }}>75 detik  •  Backsound aktif</p>
          </div>

          {/* Right: bin preview */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
            {BINS_CFG.map(bin => (
              <div key={bin.cat} style={{
                background: bin.light, border: `2px solid ${bin.border}`,
                borderRadius: 14, padding: "clamp(8px, 2.5vw, 10px) clamp(10px, 3vw, 14px)",
                display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 12px)",
              }}>
                {/* Thumbnail */}
                <div style={{ width: "clamp(40px, 10vw, 50px)", height: "clamp(40px, 10vw, 50px)", flexShrink: 0, position: "relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize: "clamp(24px, 6vw, 32px)", position: "absolute" }}>{bin.icon}</span>
                  <img src={bin.img} alt={bin.label} draggable={false}
                    style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", opacity:0, transition:"opacity 0.3s" }}
                    onLoad={e => e.currentTarget.style.opacity = "1"}
                    onError={e => e.currentTarget.style.display = "none"}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 900, color: bin.color, fontSize: "clamp(12px, 3vw, 16px)", lineHeight: 1.2 }}>{bin.label}</div>
                  <div style={{ fontSize: "clamp(10px, 2.5vw, 13px)", color: "#94a3b8", marginTop: 3, flexWrap: "wrap" }}>
                    {ITEMS_DATA.filter(it => it.cat === bin.cat).map(it => it.emoji).join(" ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════ GAME OVER ═══════════════ */
  if (g.phase === "gameover") {
    const msg    = g.score >= 270 ? "Pahlawan Lingkungan!"
                 : g.score >= 180 ? "Bagus Banget! Terus tingkatkan!"
                 : g.score >= 90  ? "Lumayan! Masih bisa lebih baik!"
                 : "Yuk coba lagi, pasti bisa!";
    return (
      <div style={{
        position: "fixed", inset: 0,
        background: "linear-gradient(160deg,#052e16,#14532d 55%,#064e3b)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Nunito',sans-serif",
        padding: "16px",
        overflow: "auto",
      }}>
        <style>{GLOBAL_CSS}</style>
        
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              background: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.3)",
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
              e.currentTarget.style.background = "rgba(255,255,255,0.3)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ← Kembali
          </button>
        )}
        
        <div style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: 20, padding: "16px 20px",
          textAlign: "center", width: "100%",
          maxWidth: "min(280px, 90vw)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          animation: "fadeUp 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          boxSizing: "border-box",
        }}>
          <h2 style={{ fontSize: "clamp(18px, 5vw, 24px)", fontWeight: 900, color: "#0f172a", margin: "0 0 8px", lineHeight: 1.2 }}>Game Over!</h2>
          <p style={{ color: "#64748b", fontSize: "clamp(11px, 3.2vw, 14px)", marginBottom: 14, lineHeight: 1.4 }}>{msg}</p>
          <div style={{
            background: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
            border: "2px solid #86efac", borderRadius: 14,
            padding: "12px 16px", marginBottom: 14,
          }}>
            <div style={{ fontSize: "clamp(8px, 2.2vw, 10px)", fontWeight: 900, color: "#16a34a", letterSpacing: 2, marginBottom: 6 }}>SKOR AKHIR</div>
            <div style={{ fontSize: "clamp(32px, 10vw, 48px)", fontWeight: 900, color: "#15803d", lineHeight: 1 }}>{g.score}</div>
            <div style={{ fontSize: "clamp(10px, 2.8vw, 12px)", color: "#16a34a", marginTop: 3 }}>dari 300 poin</div>
            <div style={{ height: 6, background: "#dcfce7", borderRadius: 6, overflow: "hidden", marginTop: 10 }}>
              <div style={{ height: "100%", width: `${(g.score / 300) * 100}%`,
                background: "linear-gradient(90deg,#22c55e,#16a34a)", borderRadius: 6, transition: "width 0.7s ease" }} />
            </div>
          </div>
          <button onClick={startGame} style={{
            background: "linear-gradient(135deg,#16a34a,#166534)",
            color: "white", border: "none", borderRadius: 12,
            padding: "clamp(10px, 2.8vw, 12px) 0", fontSize: "clamp(13px, 3.8vw, 16px)", fontWeight: 900,
            cursor: "pointer", width: "100%", marginBottom: 8,
            boxShadow: "0 3px 12px rgba(22,163,74,0.35)",
            transition: "transform 0.12s",
            minHeight: "44px",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Main Lagi
          </button>
          <p style={{ color: "#94a3b8", fontSize: "clamp(9px, 2.5vw, 11px)", margin: 0 }}>
            Skor tersimpan di <code style={{ background: "#f1f5f9", padding: "2px 5px", borderRadius: 4 }}>localStorage</code>
          </p>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════
     PLAYING — FULLSCREEN
  ═══════════════════════════════════════ */
  return (
    <div
      ref={gameRef}
      style={{
        position: "fixed", inset: 0,
        fontFamily: "'Nunito',sans-serif",
        userSelect: "none", touchAction: "none",
        cursor: g.item?.held ? "grabbing" : "default",
        overflow: "hidden",
      }}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchMove={e => { e.preventDefault(); onMove(e); }}
      onTouchEnd={onUp}
    >
      <style>{GLOBAL_CSS}</style>

      {/* ── Sky gradient base ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(180deg,#bae6fd 0%,#7dd3fc 18%,#a7f3d0 48%,#4ade80 67%,#22c55e 83%,#15803d 100%)",
      }} />

      {/* ── Background image
          objectFit: cover — fills entire screen without letterboxing.
          Swap in your background.png and it will auto-fit. ── */}
      <img src="/item/background.png" alt="background" draggable={false} style={{
        position: "absolute", inset: 0, zIndex: 1,
        width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "center center",
        opacity: 0, transition: "opacity 0.5s",
      }}
        onLoad={e => e.currentTarget.style.opacity = "1"}
      />

      {/* ── Screen flash ── */}
      {showFlash && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 190, pointerEvents: "none",
          animation: g.flashColor === "ok"
            ? "flashGreen 0.4s ease-out forwards"
            : "flashRed 0.4s ease-out forwards",
        }} />
      )}

      {/* ── Clouds ── */}
      {[
        { left: "4%",  top: "10%", s: 1,    d: "14s" },
        { left: "24%", top: "5%",  s: 0.72, d: "18s" },
        { left: "53%", top: "9%",  s: 0.85, d: "20s" },
        { left: "76%", top: "4%",  s: 0.62, d: "15s" },
      ].map((c, i) => (
        <div key={i} style={{
          position: "absolute", left: c.left, top: c.top, zIndex: 2,
          transform: `scale(${c.s})`, transformOrigin: "top left",
          pointerEvents: "none", opacity: 0.84,
          animation: `cloudDrift ${c.d} ease-in-out infinite ${i % 2 === 1 ? "reverse" : ""}`,
        }}>
          <div style={{ position: "relative", width: 110, height: 38, background: "white", borderRadius: 36 }}>
            <div style={{ position: "absolute", top: -21, left: 20, width: 48, height: 48, background: "white", borderRadius: "50%" }} />
            <div style={{ position: "absolute", top: -12, left: 54, width: 32, height: 32, background: "white", borderRadius: "50%" }} />
          </div>
        </div>
      ))}

      {/* ── Trees (decorative, sit just above bins) ── */}
      <div style={{
        position: "absolute", zIndex: 3,
        bottom: GROUND_H + BIN_H - Math.round(BIN_H * 0.18),
        left: 0, right: 0,
        display: "flex", justifyContent: "space-around",
        pointerEvents: "none",
      }}>
        {["🌳","🌴","🌲","🌳","🌴","🌲","🌳","🌴"].map((t, i) => (
          <span key={i} style={{ fontSize: fs.treeEmoji, opacity: 0.30 + (i % 3) * 0.05, userSelect: "none" }}>{t}</span>
        ))}
      </div>

      {/* ── Ground ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: GROUND_H, zIndex: 6,
        background: "linear-gradient(180deg,#14532d,#052e16)",
        borderTop: "3px solid #166534",
      }} />

      {/* ═══════════════════════════════════════
          BINS
          Each bin occupies exactly 1/3 viewport width.

          Image display logic:
          - Container: width = 70% of bin section, height = 88% of BIN_H
          - objectFit: contain  → image scales without cropping
          - objectPosition: bottom center → trash can "sits" on ground
          - Emoji fallback shows behind the image; hidden once image loads
      ═══════════════════════════════════════ */}
      {BINS_CFG.map((bin, i) => {
        const hl = g.highlightBin === bin.cat;
        return (
          <div key={bin.cat} style={{
            position: "absolute",
            left: i * BIN_W, top: BIN_Y,
            width: BIN_W, height: BIN_H,
            zIndex: 10,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "flex-end",
            paddingBottom: GROUND_H + 4,
            transition: "background 0.16s",
            background: hl
              ? `linear-gradient(180deg,${bin.color}1a 0%,${bin.color}44 100%)`
              : `linear-gradient(180deg,transparent 0%,${bin.color}0a 100%)`,
            animation: hl ? "binPop 0.3s ease-out" : "none",
          }}>
            {/* Top glow line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: hl
                ? `linear-gradient(90deg,transparent 5%,${bin.glow} 50%,transparent 95%)`
                : `linear-gradient(90deg,transparent 5%,${bin.border}55 50%,transparent 95%)`,
              transition: "background 0.15s",
            }} />

            {/* Bin image wrapper */}
            <div style={{
              position: "relative",
              width:  Math.round(Math.min(BIN_W * 0.68, BIN_H * 1.05)),
              height: Math.round(BIN_H * 0.86),
              display: "flex", alignItems: "flex-end", justifyContent: "center",
            }}>
              {/* Emoji + label fallback (always rendered, sits below image) */}
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 6, pointerEvents: "none",
              }}>
                <span style={{ fontSize: fs.binIcon, lineHeight: 1 }}>{bin.icon}</span>
                <span style={{
                  fontSize: fs.binLabel, fontWeight: 900,
                  color: hl ? "white" : bin.color,
                  textShadow: hl ? `0 0 16px ${bin.glow},0 2px 6px rgba(0,0,0,0.3)` : "0 1px 4px rgba(255,255,255,0.7)",
                  transition: "color 0.15s",
                }}>
                  {bin.label}
                </span>
                {hl && (
                  <span style={{ fontSize: fs.binHint, fontWeight: 800, color: "rgba(255,255,255,0.9)", animation: "bounce 0.65s ease-in-out infinite" }}>
                    ↓ Lepas di sini!
                  </span>
                )}
              </div>

              {/* ── REAL bin image ────────────────────────────────────────
                  Positioned absolute over the fallback.
                  objectFit:contain  → preserves aspect ratio, no crop
                  objectPosition: bottom center → "stands" on ground edge
                  drop-shadow filter follows PNG transparency exactly
              ─────────────────────────────────────────────────────────── */}
              <img
                src={bin.img}
                alt={bin.label}
                draggable={false}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                  opacity: 0,
                  transition: "opacity 0.35s, filter 0.18s",
                  pointerEvents: "none",
                  filter: hl
                    ? `drop-shadow(0 0 20px ${bin.glow}) drop-shadow(0 5px 14px rgba(0,0,0,0.35))`
                    : "drop-shadow(0 4px 16px rgba(0,0,0,0.30))",
                }}
                onLoad={e => e.currentTarget.style.opacity = "1"}
                onError={e => e.currentTarget.style.display = "none"}
              />
            </div>
          </div>
        );
      })}

      {/* Bin vertical dividers */}
      {[1, 2].map(n => (
        <div key={n} style={{
          position: "absolute",
          left: BIN_W * n - 1, top: BIN_Y,
          width: 2, height: BIN_H, zIndex: 11,
          background: "linear-gradient(180deg,transparent,rgba(255,255,255,0.18),transparent)",
        }} />
      ))}

      {/* ═══════════════════════════════════════
          FALLING ITEM

          Image display logic:
          - Container: ITEM_SZ × ITEM_SZ square
          - White rounded square background (fallback + shadow base)
          - objectFit: contain  → scales any image to fit the square
          - objectPosition: center → image centered inside square
          - drop-shadow filter follows PNG transparency
      ═══════════════════════════════════════ */}
      {g.item && (
        <div
          onMouseDown={onItemDown}
          onTouchStart={e => { e.preventDefault(); onItemDown(e); }}
          style={{
            position: "absolute",
            left: g.item.x, top: g.item.y,
            width: ITEM_SZ, height: ITEM_SZ,
            zIndex: g.item.held ? 80 : 20,
            cursor: g.item.held ? "grabbing" : "grab",
            transform: g.item.held ? "scale(1.22) rotate(6deg)" : "scale(1) rotate(0deg)",
            transition: g.item.held ? "none" : "transform 0.18s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Fallback: white rounded square + emoji */}
          <div style={{
            position: "absolute", inset: 0,
            background: "white", borderRadius: "22%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            boxShadow: g.item.held
              ? "0 20px 46px rgba(0,0,0,0.56),0 0 0 3px rgba(255,255,255,0.9)"
              : "0 6px 22px rgba(0,0,0,0.30),0 0 0 2px rgba(255,255,255,0.85)",
            transition: "box-shadow 0.14s",
          }}>
            <span style={{ fontSize: fs.itemEmoji, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
              {g.item.emoji}
            </span>
            <span style={{
              fontSize: fs.itemName, fontWeight: 900, color: "#475569",
              marginTop: 2, pointerEvents: "none", userSelect: "none", lineHeight: 1,
            }}>
              {g.item.name}
            </span>
          </div>

          {/* ── REAL item image ──────────────────────────────────────────
              objectFit:contain + objectPosition:center = image is always
              fully visible and centred inside the square container.
              Works for portrait, landscape, and square source images.
          ─────────────────────────────────────────────────────────────── */}
          <img
            src={`/item/${g.item.id}.png`}
            alt={g.item.name}
            draggable={false}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "contain",
              objectPosition: "center center",
              opacity: 0, transition: "opacity 0.22s",
              pointerEvents: "none",
              filter: g.item.held
                ? "drop-shadow(0 14px 32px rgba(0,0,0,0.6))"
                : "drop-shadow(0 5px 14px rgba(0,0,0,0.38))",
            }}
            onLoad={e => e.currentTarget.style.opacity = "1"}
            onError={e => e.currentTarget.style.display = "none"}
          />
        </div>
      )}

      {/* ═══════════════ SCORE FLOATERS ═══════════════ */}
      {g.feedbacks.map(f => (
        <div key={f.id} style={{
          position: "absolute", left: f.x - 62, top: f.y,
          fontSize: fs.feedback, fontWeight: 900,
          color: f.ok ? "#15803d" : "#b91c1c",
          pointerEvents: "none", zIndex: 300,
          animation: "floatScore 0.92s ease-out forwards",
          whiteSpace: "nowrap",
          background: f.ok ? "rgba(240,253,244,0.97)" : "rgba(255,241,242,0.97)",
          padding: "5px 16px", borderRadius: 22,
          border: `2px solid ${f.ok ? "#86efac" : "#fca5a5"}`,
          boxShadow: "0 3px 14px rgba(0,0,0,0.14)",
        }}>
          {f.text}
        </div>
      ))}

      {/* ═══════════════ HUD ═══════════════ */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: HUD_H, zIndex: 100,
        background: "rgba(5,46,22,0.82)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
        display: "flex", alignItems: "center",
        padding: `0 ${Math.round(VW * 0.025)}px`, gap: "clamp(8px, 2vw, 20px)",
        flexWrap: "wrap",
      }}>
        {/* Score */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 70 }}>
          <span style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>⭐</span>
          <div>
            <div style={{ fontSize: "clamp(8px, 2vw, 11px)", color: "rgba(255,255,255,0.45)", fontWeight: 800, letterSpacing: 1, lineHeight: 1 }}>SKOR</div>
            <div style={{
              fontSize: "clamp(16px, 5vw, 20px)", fontWeight: 900, color: "#fde047", lineHeight: 1,
              animation: g.scoreAnim ? "popIn 0.38s ease" : "none",
            }}>
              {g.score}
            </div>
          </div>
        </div>

        {/* Timer */}
        <div style={{ flex: 1, minWidth: "120px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <span style={{ fontSize: "clamp(8px, 2vw, 11px)", color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: 1 }}>WAKTU</span>
            <span style={{
              fontSize: "clamp(14px, 4vw, 18px)", color: timerColor, fontWeight: 900,
              animation: g.timeLeft <= 10 ? "wiggle 0.5s ease-in-out infinite,timerBlink 0.5s ease-in-out infinite" : "none",
            }}>
              {g.timeLeft}s
            </span>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,0.12)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${timerPct}%`,
              background: `linear-gradient(90deg,${timerColor}bb,${timerColor})`,
              borderRadius: 8, transition: "width 0.92s linear,background 0.4s",
              boxShadow: `0 0 10px ${timerColor}66`,
            }} />
          </div>
        </div>

        {/* Item counter */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 60 }}>
          <span style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>📦</span>
          <div>
            <div style={{ fontSize: "clamp(8px, 2vw, 11px)", color: "rgba(255,255,255,0.45)", fontWeight: 800, letterSpacing: 1, lineHeight: 1 }}>ITEM</div>
            <div style={{ fontSize: "clamp(14px, 4vw, 18px)", fontWeight: 900, color: "#e2e8f0", lineHeight: 1 }}>
              {Math.min(g.idx, MAX_ITEMS)}/{MAX_ITEMS}
            </div>
          </div>
        </div>

        {/* Mute button */}
        <button onClick={toggleMute} title={muted ? "Aktifkan suara" : "Matikan suara"} style={{
          background: muted ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.12)",
          border: `1px solid ${muted ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.2)"}`,
          borderRadius: 10, padding: "clamp(6px, 2vw, 8px) clamp(10px, 3vw, 13px)",
          color: "white", fontSize: "clamp(14px, 4vw, 18px)",
          cursor: "pointer", flexShrink: 0,
          transition: "background 0.15s,border 0.15s",
          minHeight: "44px",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
          onMouseLeave={e => e.currentTarget.style.background = muted ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.12)"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* Waiting hint */}
      {!g.item && g.idx < MAX_ITEMS && g.phase === "playing" && (
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          color: "rgba(255,255,255,0.38)", fontSize: fs.waiting,
          fontWeight: 800, pointerEvents: "none", zIndex: 4,
        }}>
          ⏳ Bersiap...
        </div>
      )}
    </div>
  );
}
