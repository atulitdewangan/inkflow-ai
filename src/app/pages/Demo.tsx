"use client";

import { useState } from "react";
import { Sparkles, Check, FileDown, ImageDown, Share2 } from "lucide-react";
import { useTheme } from "../theme";
import { SelectField } from "../shared";

type PaperStyle = "Lined" | "Dotted" | "Blank";
type PenPalette = "Classic Ink" | "Pastel" | "Minimal";

const PALETTES = {
  "Classic Ink": { heading: "#1D4ED8", body: "#1E293B", accent: "#2563eb" },
  "Pastel":      { heading: "#7c3aed", body: "#374151", accent: "#6d28d9" },
  "Minimal":     { heading: "#111827", body: "#374151", accent: "#374151" },
};

const DOT_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='0.85' fill='%23c8c4bc' opacity='0.5'/%3E%3C/svg%3E")`;

const NOTES = [
  { type: "bullet", text: "The plasma membrane is a selectively permeable phospholipid bilayer — controls what enters & exits." },
  { type: "bullet", text: "Passive transport: high → low concentration. Requires no ATP energy input." },
  { type: "definition", label: "Key Term:", text: "Facilitated diffusion — uses channel/carrier proteins to move molecules without energy." },
  { type: "bullet", text: "Active transport moves against the gradient — requires ATP. Ex: Na⁺/K⁺ pump." },
  { type: "bullet", text: "Endocytosis: cell engulfs particles → vesicle forms inside (phagocytosis, pinocytosis)." },
  { type: "subnote", text: "Remember: osmosis is the diffusion of water across a semipermeable membrane!" },
  { type: "section", text: "Signal Transduction" },
  { type: "bullet", text: "Ligand binds receptor → intracellular cascade → cellular response." },
  { type: "bullet", text: "GPCRs are the most common signalling proteins in eukaryotes." },
];

function NoteLine({ item, pal, index }: { item: typeof NOTES[0]; pal: typeof PALETTES["Classic Ink"]; index: number }) {
  const delay = `${0.06 + index * 0.07}s`;
  if (item.type === "bullet") return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", animation: `fadeUp 0.35s ease ${delay} both` }}>
      <span style={{ fontFamily: "'Caveat',cursive", fontSize: "20px", color: pal.body, lineHeight: "1.45", flexShrink: 0 }}>→</span>
      <p style={{ fontFamily: "'Caveat',cursive", fontSize: "17.5px", color: pal.body, lineHeight: 1.6, margin: 0 }}>{item.text}</p>
    </div>
  );
  if (item.type === "definition") return (
    <div style={{ background: "#FEF08A", borderRadius: "5px", padding: "10px 14px", animation: `fadeUp 0.4s ease ${delay} both` }}>
      <span style={{ fontFamily: "'Caveat',cursive", fontSize: "12px", fontWeight: 700, color: "#854d0e", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "3px" }}>{item.label}</span>
      <p style={{ fontFamily: "'Caveat',cursive", fontSize: "17px", color: "#1c1917", lineHeight: 1.55, margin: 0 }}>{item.text}</p>
    </div>
  );
  if (item.type === "subnote") return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", paddingLeft: "18px", animation: `fadeUp 0.35s ease ${delay} both` }}>
      <span style={{ color: "#f59e0b", fontSize: "13px", marginTop: "5px", flexShrink: 0 }}>★</span>
      <p style={{ fontFamily: "'Caveat',cursive", fontSize: "15.5px", color: pal.body, opacity: 0.7, lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>{item.text}</p>
    </div>
  );
  if (item.type === "section") return (
    <div style={{ marginTop: "12px", marginBottom: "4px", animation: `fadeUp 0.4s ease ${delay} both` }}>
      <p style={{ fontFamily: "'Caveat',cursive", fontSize: "20px", fontWeight: 700, color: pal.heading, borderBottom: `1.5px dashed ${pal.heading}44`, paddingBottom: "6px", margin: 0 }}>{item.text}</p>
    </div>
  );
  return null;
}

function Paper({ paperStyle, penPalette, revealed, generating }: { paperStyle: PaperStyle; penPalette: PenPalette; revealed: boolean; generating: boolean }) {
  const pal = PALETTES[penPalette];
  const lineStyle = paperStyle === "Lined"
    ? { backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, rgba(100,116,139,0.18) 28px)`, backgroundSize: "100% 28px", backgroundPositionY: "40px" }
    : paperStyle === "Dotted" ? { backgroundImage: DOT_SVG } : {};

  return (
    <div style={{ position: "relative", width: "480px", minHeight: "680px", background: "#FEFEFE", borderRadius: "4px", boxShadow: "0 8px 12px rgba(0,0,0,0.06),0 20px 60px rgba(0,0,0,0.13)", animation: "pageEnter 0.55s cubic-bezier(.34,1.2,.64,1) both", ...lineStyle }}>
      {/* tape */}
      <div style={{ position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%) rotate(-1.5deg)", width: "60px", height: "18px", background: "rgba(253,241,158,0.88)", borderRadius: "3px" }} />

      {/* generating overlay */}
      {generating && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(254,253,247,0.88)", backdropFilter: "blur(4px)", borderRadius: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px", zIndex: 10, animation: "fadeUp 0.2s ease both" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid rgba(99,102,241,0.15)", borderTopColor: "#6366f1", animation: "spinSlow 0.8s linear infinite" }} />
          <p style={{ fontFamily: "'Caveat',cursive", fontSize: "20px", color: "#1D4ED8", fontWeight: 600, margin: 0 }}>Writing your notes…</p>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "12px", color: "#9ca3af", margin: 0 }}>AI is composing handwritten content</p>
        </div>
      )}

      <div style={{ padding: "38px 40px 28px", display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ marginBottom: "4px" }}>
          <h2 style={{ fontFamily: "'Caveat',cursive", fontSize: "27px", fontWeight: 700, color: pal.heading, lineHeight: 1.2, margin: 0, animation: "fadeUp 0.4s ease 0.05s both" }}>Cell Biology — Lecture 4</h2>
          <p style={{ fontFamily: "'Caveat',cursive", fontSize: "14px", color: pal.body, opacity: 0.5, margin: "2px 0 0", animation: "fadeUp 0.35s ease 0.12s both" }}>June 24, 2026</p>
        </div>
        <p style={{ fontFamily: "'Caveat',cursive", fontSize: "16px", color: pal.accent, fontWeight: 600, borderBottom: `1.5px solid ${pal.heading}22`, paddingBottom: "10px", marginBottom: "14px", animation: "fadeUp 0.4s ease 0.18s both" }}>
          Membrane Transport & Cellular Signals
        </p>

        {revealed
          ? <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
              {NOTES.map((item, i) => <NoteLine key={i} item={item} pal={pal} index={i} />)}
            </div>
          : <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              {[80,65,90,50,75,45,88,60,70].map((w, i) => (
                <div key={i} style={{ height: "13px", width: `${w}%`, borderRadius: "6px", background: `linear-gradient(90deg,${pal.heading}0a 0%,${pal.heading}18 50%,${pal.heading}0a 100%)`, backgroundSize: "200% 100%", animation: `shimmer 2.2s ease-in-out ${i * 0.12}s infinite` }} />
              ))}
            </div>
        }

        <div style={{ marginTop: "auto", paddingTop: "24px", display: "flex", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Caveat',cursive", fontSize: "13px", color: pal.body, opacity: 0.28 }}>— 1 —</span>
        </div>
      </div>

      {/* export bar */}
      <div style={{ position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "2px", background: "rgba(18,18,30,0.93)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: "999px", padding: "4px 6px", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", whiteSpace: "nowrap", animation: "fadeUp 0.5s ease 0.5s both" }}>
        {[
          { icon: <FileDown size={13} />, label: "PDF" },
          { icon: <ImageDown size={13} />, label: "PNG" },
          { icon: <Share2 size={13} />, label: "Share" },
        ].map(({ icon, label }, i) => (
          <ExportBtn key={i} icon={icon} label={label} />
        ))}
      </div>
    </div>
  );
}

function ExportBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [hov, setHov] = useState(false);
  const [clicked, setClicked] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => { setClicked(true); setTimeout(() => setClicked(false), 1400); }}
      style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "11.5px", fontWeight: 500, color: hov ? "#fff" : "#c4bfb5", background: hov ? "rgba(99,102,241,0.28)" : "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", padding: "6px 12px", borderRadius: "999px", transition: "all 0.18s" }}
    >
      {clicked ? <Check size={13} style={{ animation: "checkPop 0.3s cubic-bezier(.34,1.56,.64,1) both" }} /> : icon}
      {clicked ? "Done!" : label}
    </button>
  );
}

export default function Demo() {
  const { t } = useTheme();
  const [transcript, setTranscript] = useState("");
  const [paperStyle, setPaperStyle] = useState<PaperStyle>("Dotted");
  const [penPalette, setPenPalette] = useState<PenPalette>("Classic Ink");
  const [generating, setGenerating] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [chars, setChars] = useState(0);

  const handleGenerate = () => {
    if (generating) return;
    setRevealed(false);
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setRevealed(true); }, 2300);
  };

  return (
    <div style={{ paddingTop: "62px", minHeight: "100vh" }}>
      <section style={{ padding: "60px 60px 100px" }}>
        {/* header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "12px", fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 10px", animation: "fadeUp 0.5s ease 0.05s both" }}>Live demo</p>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(30px,4vw,48px)", fontWeight: 800, letterSpacing: "-0.03em", color: t.text, margin: "0 0 14px", lineHeight: 1.1, animation: "fadeUp 0.55s ease 0.12s both" }}>
            Paste. Generate. Export.
          </h1>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "16px", color: t.textMuted, margin: 0, lineHeight: 1.7, animation: "fadeUp 0.55s ease 0.2s both" }}>
            Try InkFlow right now — no sign-up required.
          </p>
        </div>

        {/* two-column: form left, paper right */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "420px 1fr", gap: "56px", alignItems: "start" }}>

          {/* ── INPUT FORM ── */}
          <div style={{ animation: "fadeUp 0.6s ease 0.2s both" }}>
            {/* outer neumorphic tray */}
            <div style={{ borderRadius: "28px", background: t.bg, boxShadow: t.raised, padding: "8px" }}>
              {/* glass inner card */}
              <div style={{ borderRadius: "22px", background: t.glass, backdropFilter: "blur(24px)", border: `1px solid ${t.glassBorder}`, boxShadow: t.glassShadow, padding: "30px 28px", display: "flex", flexDirection: "column", gap: "18px" }}>

                <label style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "13px", fontWeight: 600, color: t.labelColor, display: "block" }}>
                  Lecture Transcript
                </label>

                {/* textarea */}
                <div style={{ position: "relative" }}>
                  <textarea value={transcript}
                    onChange={e => { setTranscript(e.target.value); setChars(e.target.value.length); if (revealed) setRevealed(false); }}
                    placeholder={"Paste Lecture Transcript Here…\n\nToday we cover cell membrane transport. The plasma membrane is a phospholipid bilayer that controls entry and exit. Passive transport requires no ATP…"}
                    style={{ width: "100%", minHeight: "190px", borderRadius: "14px", padding: "16px", fontSize: "13.5px", lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans',sans-serif", color: t.text, border: "none", outline: "none", resize: "vertical", background: t.bg, boxShadow: t.insetDeep, boxSizing: "border-box", caretColor: "#6366f1", transition: "box-shadow 0.25s" }}
                    onFocus={e => { e.currentTarget.style.boxShadow = `${t.insetDeep}, 0 0 0 3px rgba(99,102,241,0.14)`; }}
                    onBlur={e => { e.currentTarget.style.boxShadow = t.insetDeep; }}
                  />
                  <span style={{ position: "absolute", bottom: "11px", right: "13px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "11px", color: t.textFaint, pointerEvents: "none" }}>{chars.toLocaleString()} chars</span>
                </div>

                {/* settings */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <SelectField label="Paper Style" value={paperStyle} options={["Lined","Dotted","Blank"]} onChange={v => setPaperStyle(v as PaperStyle)} />
                  <SelectField label="Pen Palette" value={penPalette} options={["Classic Ink","Pastel","Minimal"]} onChange={v => setPenPalette(v as PenPalette)} />
                </div>

                <div style={{ height: "1px", background: t.divider }} />

                {/* generate + status row */}
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <button onClick={handleGenerate} disabled={generating}
                    style={{ flex: 1, padding: "15px", borderRadius: "14px", border: "none", background: revealed ? "linear-gradient(135deg,#059669,#10b981)" : "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", cursor: generating ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: revealed ? `6px 6px 20px ${t.shadow},-4px -4px 12px ${t.light},0 4px 20px rgba(16,185,129,0.35)` : `6px 6px 20px ${t.shadow},-4px -4px 12px ${t.light},0 4px 20px rgba(99,102,241,0.38)`, transition: "transform 0.15s,box-shadow 0.15s,background 0.3s", letterSpacing: "0.01em", animation: !generating && !revealed ? "pulseRing 3s ease-in-out 3s infinite" : "none" }}
                    onMouseEnter={e => { if (!generating) e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {generating
                      ? <><svg style={{ animation: "spinSlow 0.75s linear infinite", flexShrink: 0 }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg> Generating…</>
                      : revealed
                      ? <><Check size={15} style={{ animation: "checkPop 0.4s cubic-bezier(.34,1.56,.64,1) both" }} /> Notes ready ↗</>
                      : <><Sparkles size={14} strokeWidth={2} /> Generate Handwritten Notes ✨</>
                    }
                  </button>

                  {/* status pill */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 14px", borderRadius: "12px", background: t.glass, backdropFilter: "blur(10px)", border: `1px solid ${t.glassBorder}`, boxShadow: `4px 4px 12px ${t.shadow},-2px -2px 8px ${t.light}`, whiteSpace: "nowrap", flexShrink: 0 }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: generating ? "#f59e0b" : revealed ? "#10b981" : "#d1d5db", transition: "background 0.4s", animation: generating || revealed ? "pulseRing 2s infinite" : "none" }} />
                    <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: t.text }}>{generating ? "Processing" : revealed ? "Done" : "Ready"}</span>
                  </div>
                </div>

                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "11.5px", color: t.textFaint, textAlign: "center", margin: 0, lineHeight: 1.6 }}>
                  🔒 Processed ephemerally. Zero data stored.
                </p>
              </div>
            </div>
          </div>

          {/* ── PAPER PREVIEW ── */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "16px", animation: "floatY 7s ease-in-out 1s infinite" }}>
            <Paper paperStyle={paperStyle} penPalette={penPalette} revealed={revealed} generating={generating} />
          </div>
        </div>
      </section>
    </div>
  );
}
