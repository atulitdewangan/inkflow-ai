"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowDown, Star, Zap, PenTool, Download, ChevronRight } from "lucide-react";
import { useTheme } from "../theme";
import { useScrollFade, GradSpan } from "../shared";

function Blob({ style }: { style: React.CSSProperties }) {
  return <div style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", ...style }} />;
}

/* ── Hero ── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const fade = useScrollFade(ref, 0.5);
  const { t, dark } = useTheme();
  const router = useRouter();

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "100px 60px 80px" }}>
      <Blob style={{ top: "8%", left: "4%", width: "440px", height: "440px", background: "radial-gradient(circle,rgba(99,102,241,0.09) 0%,transparent 70%)", animation: "blobDrift 12s ease-in-out infinite" }} />
      <Blob style={{ bottom: "8%", right: "6%", width: "340px", height: "340px", background: "radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 70%)", animation: "blobDrift 15s ease-in-out 3s infinite" }} />
      <Blob style={{ top: "42%", right: "24%", width: "200px", height: "200px", background: "radial-gradient(circle,rgba(254,240,138,0.10) 0%,transparent 70%)", animation: "blobDrift 9s ease-in-out 1.5s infinite" }} />

      <div ref={ref} style={{ ...fade, maxWidth: "1100px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center", transition: "opacity .08s,transform .08s" }}>
        {/* copy */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 16px", borderRadius: "999px", background: t.glass, backdropFilter: "blur(12px)", border: `1px solid ${t.glassBorder}`, boxShadow: t.raisedSm, width: "fit-content", animation: "fadeUp 0.6s ease 0.1s both" }}>
            <Star size={12} fill="#f59e0b" stroke="none" />
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#6366f1", letterSpacing: "0.04em", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>AI-powered note generation</span>
          </div>

          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(38px,5vw,62px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.035em", color: t.text, margin: 0, animation: "fadeUp 0.65s ease 0.2s both" }}>
            Your lectures,<br /><GradSpan>written beautifully.</GradSpan>
          </h1>

          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "17px", lineHeight: 1.7, color: t.textMuted, margin: 0, maxWidth: "420px", animation: "fadeUp 0.65s ease 0.3s both" }}>
            Paste any lecture transcript and watch InkFlow transform it into handcrafted notes — structured, styled, and export-ready in seconds.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", animation: "fadeUp 0.65s ease 0.4s both" }}>
            <button onClick={() => router.push("/demo")}
              style={{ padding: "14px 30px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontSize: "15px", fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif", cursor: "pointer", boxShadow: `6px 6px 18px ${t.shadow},-4px -4px 12px ${t.light},0 6px 24px rgba(99,102,241,0.4)`, display: "flex", alignItems: "center", gap: "8px", transition: "transform 0.15s", animation: "pulseRing 3s ease-in-out 2s infinite" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <Sparkles size={15} /> Start for free
            </button>
            <button onClick={() => router.push("/how-it-works")}
              style={{ padding: "14px 26px", borderRadius: "12px", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "15px", fontWeight: 600, color: t.text, background: t.bg, boxShadow: t.raisedSm, transition: "box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = t.inset; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = t.raisedSm; }}
            >
              How it works
            </button>
          </div>

          <div style={{ display: "flex", gap: "28px", animation: "fadeUp 0.65s ease 0.5s both" }}>
            {[["12k+","Students"],["4.9★","Rating"],["3s","Avg. generation"]].map(([n, l]) => (
              <div key={l}>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "20px", fontWeight: 800, color: t.text, margin: 0, letterSpacing: "-0.02em" }}>{n}</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "12px", color: t.textFaint, margin: "2px 0 0" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* mock card */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", animation: "fadeUp 0.7s ease 0.35s both" }}>
          <div style={{ padding: "24px", borderRadius: "24px", background: t.bg, boxShadow: t.raised }}>
            <div style={{ width: "320px", borderRadius: "16px", background: t.glass, backdropFilter: "blur(20px)", border: `1px solid ${t.glassBorder}`, boxShadow: t.glassShadow, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: `1px solid ${t.glassBorder}`, display: "flex", alignItems: "center", gap: "7px" }}>
                {["#f87171","#fbbf24","#34d399"].map(c => <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />)}
                <span style={{ marginLeft: "8px", fontSize: "12px", fontWeight: 600, color: t.textMuted, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>InkFlow Preview</span>
              </div>
              <div style={{ padding: "20px", background: dark ? "rgba(40,36,32,0.7)" : "rgba(254,253,247,0.8)" }}>
                <p style={{ fontFamily: "'Caveat',cursive", fontSize: "20px", fontWeight: 700, color: "#1D4ED8", margin: "0 0 6px" }}>Biology — Lecture 4</p>
                <p style={{ fontFamily: "'Caveat',cursive", fontSize: "13px", color: "#64748b", margin: "0 0 14px" }}>June 24, 2026</p>
                {[
                  { type: "bullet", text: "Plasma membrane — phospholipid bilayer" },
                  { type: "highlight", text: "Key Term: Facilitated diffusion" },
                  { type: "bullet", text: "Active transport requires ATP energy" },
                  { type: "bullet", text: "Na⁺/K⁺ pump — classic active transporter" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px", ...(item.type === "highlight" ? { background: "#FEF08A", borderRadius: "4px", padding: "5px 8px", gap: "0" } : {}), animation: `fadeUp 0.4s ease ${0.5 + i * 0.08}s both` }}>
                    {item.type === "bullet" && <span style={{ fontFamily: "'Caveat',cursive", fontSize: "18px", color: "#1E293B", lineHeight: "1.4", flexShrink: 0 }}>→</span>}
                    <span style={{ fontFamily: "'Caveat',cursive", fontSize: "15px", color: item.type === "highlight" ? "#854d0e" : "#1E293B", lineHeight: "1.5" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: "-12px", right: "20px", background: t.glass, backdropFilter: "blur(16px)", border: `1px solid ${t.glassBorder}`, borderRadius: "12px", padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px", boxShadow: t.glassShadow, animation: "floatY 5s ease-in-out infinite" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981", animation: "pulseRing 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: t.text }}>Notes generated in 2.8s</span>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", animation: "floatY 2.5s ease-in-out infinite" }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "11px", fontWeight: 500, color: t.textFaint, letterSpacing: "0.08em", textTransform: "uppercase" }}>Scroll</span>
        <ArrowDown size={14} color={t.textFaint} />
      </div>
    </section>
  );
}

/* ── Quick nav cards ── */
function QuickCard({ icon, label, desc, to, delay }: { icon: React.ReactNode; label: string; desc: string; to: string; delay: number }) {
  const { t } = useTheme();
  const router = useRouter();
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => router.push(to)}
      style={{ borderRadius: "20px", background: t.bg, boxShadow: hov ? t.inset : t.raised, padding: "28px 24px", cursor: "pointer", transition: "box-shadow 0.3s, transform 0.25s", transform: hov ? "translateY(3px)" : "translateY(0)", animation: `fadeUp 0.55s ease ${0.15 + delay}s both`, display: "flex", flexDirection: "column", gap: "14px" }}
    >
      <div style={{ width: "46px", height: "46px", borderRadius: "13px", background: t.bg, boxShadow: hov ? t.raised : t.inset, display: "flex", alignItems: "center", justifyContent: "center", transition: "box-shadow 0.3s" }}>{icon}</div>
      <div>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "15px", fontWeight: 700, color: t.text, margin: "0 0 6px", letterSpacing: "-0.01em" }}>{label}</p>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "13px", color: t.textMuted, margin: 0, lineHeight: 1.65 }}>{desc}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#6366f1", marginTop: "auto" }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "12px", fontWeight: 600 }}>Explore</span>
        <ChevronRight size={13} />
      </div>
    </div>
  );
}

function QuickCards() {
  const ref = useRef<HTMLDivElement>(null);
  const fade = useScrollFade(ref, 0.4);
  const cards = [
    { icon: <Zap size={20} color="#6366f1" />, label: "Features", desc: "Semantic AI, 17 handwriting styles, live preview", to: "/features" },
    { icon: <PenTool size={20} color="#8b5cf6" />, label: "How it works", desc: "Three steps from transcript to export-ready notes", to: "/how-it-works" },
    { icon: <Download size={20} color="#10b981" />, label: "Try the demo", desc: "Paste your transcript and generate right now", to: "/demo" },
  ];
  return (
    <section style={{ padding: "80px 60px 120px" }}>
      <div ref={ref} style={{ ...fade, maxWidth: "1000px", margin: "0 auto", transition: "opacity .08s,transform .08s" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
          {cards.map((c, i) => <QuickCard key={i} {...c} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return <><Hero /><QuickCards /></>;
}
