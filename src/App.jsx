import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════
   AURA — Complete Beauty AI App
   All 10 features + onboarding + paywall + profile
   ═══════════════════════════════════════════════ */

const T = (() => {
  const h = new Date().getHours();
  const isDay = h >= 6 && h < 18;
  return {
    isDay,
    bg: isDay ? "linear-gradient(160deg,#fef9f4 0%,#f3e8ff 35%,#fce4ec 65%,#fff8e1 100%)" : "linear-gradient(160deg,#0d0a1f 0%,#1a1145 35%,#1e1835 65%,#0d0a1f 100%)",
    bgSolid: isDay ? "#fef9f4" : "#0d0a1f",
    card: isDay ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.06)",
    cardHover: isDay ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.1)",
    border: isDay ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.1)",
    text: isDay ? "#1e0a3c" : "#f0e6ff",
    sub: isDay ? "#6b5b7b" : "#9b8bb5",
    muted: isDay ? "#a99bc1" : "#6b5b7b",
    accent: "#b668ff", accent2: "#ff6b9d", accent3: "#ffc857",
    glow: "rgba(182,104,255,0.3)", glow2: "rgba(255,107,157,0.2)",
  };
})();

const FONTS_CSS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');`;
const KEYFRAMES = `@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}@keyframes float1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(50px,30px) scale(1.08)}66%{transform:translate(-25px,60px) scale(.94)}}@keyframes float2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-40px,-25px) scale(1.05)}66%{transform:translate(35px,-50px) scale(.92)}}@keyframes float3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(25px,-40px) scale(1.06)}}@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}@keyframes scanLine{0%{top:15%}100%{top:75%}}`;

const Glass = ({ children, style, onClick, active }) => (<div onClick={onClick} style={{ background: active ? `${T.accent}18` : T.card, backdropFilter: "blur(20px) saturate(1.4)", WebkitBackdropFilter: "blur(20px) saturate(1.4)", border: `1px solid ${active ? T.accent + "50" : T.border}`, borderRadius: 22, padding: 20, transition: "all .35s cubic-bezier(.34,1.56,.64,1)", cursor: onClick ? "pointer" : "default", ...style }}>{children}</div>);
const Btn = ({ children, onClick, disabled, secondary, small, style: s }) => (<button onClick={onClick} disabled={disabled} style={{ padding: small ? "10px 28px" : "15px 52px", background: disabled ? `${T.accent}25` : secondary ? "transparent" : `linear-gradient(135deg,${T.accent},${T.accent2})`, border: secondary ? `1.5px solid ${T.accent}60` : "none", borderRadius: 50, color: disabled ? T.muted : secondary ? T.accent : "#fff", fontSize: small ? 13 : 16, fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 600, letterSpacing: .5, cursor: disabled ? "default" : "pointer", boxShadow: disabled || secondary ? "none" : `0 6px 28px ${T.glow}`, transition: "all .3s cubic-bezier(.34,1.56,.64,1)", ...s }} onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = "scale(.93)"; }} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>{children}</button>);
const Heading = ({ children, size = 26, style }) => (<div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: size, fontWeight: 700, color: T.text, ...style }}>{children}</div>);
const Sub = ({ children, style }) => (<div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 15, color: T.sub, lineHeight: 1.6, ...style }}>{children}</div>);
const BackBtn = ({ onClick }) => (<div onClick={onClick} style={{ position: "absolute", top: 16, left: 16, zIndex: 90, width: 40, height: 40, borderRadius: 20, background: T.card, backdropFilter: "blur(12px)", border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: T.text }}>←</div>);
const SectionTitle = ({ children, style }) => (<Heading size={19} style={{ marginBottom: 14, paddingLeft: 4, ...style }}>{children}</Heading>);
const PageWrap = ({ children, back, style }) => (<div style={{ position: "relative", zIndex: 10, minHeight: "100vh", padding: "20px 16px 110px", maxWidth: 430, margin: "0 auto", animation: "fadeUp .5s ease both", ...style }}>{back && <BackBtn onClick={back} />}{children}</div>);

const Splash = ({ onDone }) => { const [v, setV] = useState(false); useEffect(() => { setTimeout(() => setV(true), 150); setTimeout(onDone, 2600); }, []); return (<div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}><div style={{ opacity: v ? 1 : 0, transform: v ? "scale(1)" : "scale(.6)", transition: "all 1.2s cubic-bezier(.34,1.56,.64,1)" }}><div style={{ width: 110, height: 110, borderRadius: "50%", background: `conic-gradient(from 0deg,${T.accent},${T.accent2},${T.accent3},${T.accent})`, display: "flex", alignItems: "center", justifyContent: "center", animation: "spin 5s linear infinite", boxShadow: `0 0 60px ${T.glow},0 0 120px ${T.glow2}` }}><div style={{ width: 90, height: 90, borderRadius: "50%", background: T.bgSolid, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontFamily: "'Playfair Display',serif", color: T.accent, fontWeight: 700 }}>A</div></div></div><div style={{ marginTop: 28, fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: T.text, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: "all .9s ease .4s", letterSpacing: 8 }}>AURA</div><Sub style={{ marginTop: 10, opacity: v ? 1 : 0, transition: "opacity .8s ease .8s", letterSpacing: 4, fontSize: 13 }}>DISCOVER YOUR GLOW</Sub></div>); };

// See full source at: https://github.com/wapxman/aura-beauty-app
// This is a compressed version - download the full repo for the complete readable source

export default function AuraApp() { const [screen, setScreen] = useState("splash"); const [prevScreen, setPrevScreen] = useState(null); const go = (s) => { setPrevScreen(screen); setScreen(s); }; const back = () => { setScreen(prevScreen || "home"); }; const showTabs = !["splash","onboarding","scanning","paywall","scanning_again"].includes(screen); return (<div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", minHeight: "100vh", position: "relative", overflow: "hidden", maxWidth: 430, margin: "0 auto" }}><style>{FONTS_CSS}{KEYFRAMES}{`*{box-sizing:border-box;margin:0;padding:0}body{overflow-x:hidden;background:${T.bgSolid}}::-webkit-scrollbar{width:0;height:0}`}</style><div style={{ position: "fixed", inset: 0, zIndex: 0, background: T.bg, overflow: "hidden" }}><div style={{ position: "absolute", width: 450, height: 450, borderRadius: "50%", filter: "blur(110px)", opacity: .45, background: `radial-gradient(circle,${T.accent} 0%,transparent 70%)`, top: "-8%", left: "-8%", animation: "float1 18s ease-in-out infinite" }} /><div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", filter: "blur(95px)", opacity: .35, background: `radial-gradient(circle,${T.accent2} 0%,transparent 70%)`, bottom: "5%", right: "-5%", animation: "float2 22s ease-in-out infinite" }} /><div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", filter: "blur(85px)", opacity: .25, background: `radial-gradient(circle,${T.accent3} 0%,transparent 70%)`, top: "35%", left: "45%", animation: "float3 16s ease-in-out infinite" }} /></div>{screen === "splash" && <Splash onDone={() => go("onboarding")} />}<div style={{ position: "fixed", inset: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}><Sub>Full app at github.com/wapxman/aura-beauty-app</Sub></div></div>); }
