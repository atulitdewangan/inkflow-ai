/* Shared keyframes, scroll-fade hook, and small primitives used across pages */
import { useState, useEffect, useRef } from "react";
import { useTheme } from "./theme";

export const KEYFRAMES = `
  @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes pulseRing {
    0%  {box-shadow:0 0 0 0 rgba(99,102,241,.45)}
    70% {box-shadow:0 0 0 12px rgba(99,102,241,0)}
    100%{box-shadow:0 0 0 0 rgba(99,102,241,0)}
  }
  @keyframes blobDrift {
    0%,100%{transform:translate(0,0) scale(1)}
    33%    {transform:translate(30px,-20px) scale(1.05)}
    66%    {transform:translate(-20px,15px) scale(0.96)}
  }
  @keyframes checkPop {
    0%{transform:scale(0)} 60%{transform:scale(1.3)} 100%{transform:scale(1)}
  }
  @keyframes lineGrow  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
  @keyframes shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes pageEnter { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  .hide-scrollbar::-webkit-scrollbar{display:none}
  .hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
`;

export function StyleTag() {
  return <style>{KEYFRAMES}</style>;
}

/* Elements fade out + drift up as they scroll past the top of the viewport */
export function useScrollFade(ref: React.RefObject<HTMLElement | null>, strength = 0.45) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= 0) { setStyle({ opacity: 1, transform: "translateY(0px)" }); return; }
      const p = Math.min(1, Math.abs(rect.top) / (el.offsetHeight * strength));
      setStyle({ opacity: Math.max(0, 1 - p * 1.6), transform: `translateY(${-p * 40}px)`, pointerEvents: p > 0.8 ? "none" : "auto" });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [strength]);
  return style;
}

/* Neumorphic select */
export function SelectField({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  const { t } = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "11px", fontWeight: 700, color: t.textFaint, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ width: "100%", appearance: "none", borderRadius: "12px", padding: "11px 36px 11px 16px", fontSize: "14px", fontFamily: "'Plus Jakarta Sans',sans-serif", color: t.text, border: "none", outline: "none", cursor: "pointer", background: t.bg, boxShadow: t.inset, transition: "box-shadow 0.2s", boxSizing: "border-box" }}
          onFocus={e => { e.currentTarget.style.boxShadow = `${t.insetDeep}, 0 0 0 3px rgba(99,102,241,0.15)`; }}
          onBlur={e => { e.currentTarget.style.boxShadow = t.inset; }}
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.textFaint} strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>
  );
}

/* Gradient heading helper */
export function GradSpan({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
      {children}
    </span>
  );
}

/* Section label + heading block */
export function SectionHead({ eyebrow, heading, sub }: { eyebrow: string; heading: React.ReactNode; sub?: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "56px" }}>
      <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "12px", fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 10px" }}>{eyebrow}</p>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(32px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--fg)", margin: 0, lineHeight: 1.12 }}>{heading}</h2>
      {sub && <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "16px", color: "var(--muted)", margin: "14px auto 0", lineHeight: 1.7, maxWidth: "500px" }}>{sub}</p>}
    </div>
  );
}
