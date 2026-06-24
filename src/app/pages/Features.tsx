"use client";

import { useRef, useState } from "react";
import { Zap, PenTool, Download, Shield, Layers, Cpu, Globe, Clock, Sliders } from "lucide-react";
import { useTheme } from "../theme";
import { useScrollFade, GradSpan } from "../shared";

const FEATURES = [
  { icon: <Cpu size={22} color="#6366f1" />, title: "Semantic AI Parsing", desc: "Context-aware understanding that detects emphasis, structure, and key concepts — not just keywords. Handles messy transcripts gracefully.", tag: "Powered by GPT-4o" },
  { icon: <PenTool size={22} color="#8b5cf6" />, title: "17 Handwriting Styles", desc: "From bold academic print to flowing cursive. Every style is hand-tuned for legibility and authentic paper feel.", tag: "Fully customisable" },
  { icon: <Download size={22} color="#10b981" />, title: "Export Anywhere", desc: "High-res PDF, lossless PNG, Notion blocks, or raw Markdown. Your notes, your workflow, your way.", tag: "One-click export" },
  { icon: <Layers size={22} color="#f59e0b" />, title: "Paper & Ink Palettes", desc: "Lined, dotted, or blank paper. Classic ink, pastel, or minimal palettes. Mix and match for the perfect look.", tag: "3 × 3 combinations" },
  { icon: <Clock size={22} color="#ef4444" />, title: "3-Second Generation", desc: "No waiting. Notes appear almost instantly so you can review, tweak, and export while the lecture is still fresh.", tag: "Real-time pipeline" },
  { icon: <Shield size={22} color="#06b6d4" />, title: "Private by Default", desc: "Transcripts are processed ephemerally. Nothing is stored, logged, or used for training. Your data is yours.", tag: "Zero retention" },
  { icon: <Globe size={22} color="#84cc16" />, title: "Multilingual Support", desc: "Handles lecture transcripts in 42 languages and automatically formats notes in the source language.", tag: "42 languages" },
  { icon: <Sliders size={22} color="#a855f7" />, title: "Fine-grained Controls", desc: "Adjust heading weight, bullet depth, margin width, and font size independently for each export.", tag: "Advanced settings" },
  { icon: <Zap size={22} color="#f97316" />, title: "Instant Live Preview", desc: "Changes reflect immediately on the A4 canvas. What you see is exactly what you export — no surprises.", tag: "WYSIWYG" },
];

function FeatureCard({ icon, title, desc, tag, delay }: { icon: React.ReactNode; title: string; desc: string; tag: string; delay: number }) {
  const { t } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: "20px", background: t.bg, boxShadow: hov ? t.inset : t.raised, padding: "30px 26px", transition: "box-shadow 0.3s, transform 0.25s", transform: hov ? "translateY(3px)" : "translateY(0)", cursor: "default", animation: `fadeUp 0.55s ease ${delay}s both` }}
    >
      <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: t.bg, boxShadow: hov ? t.raised : t.inset, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", transition: "box-shadow 0.3s" }}>
        {icon}
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: "6px", background: t.glass, backdropFilter: "blur(10px)", border: `1px solid ${t.glassBorder}`, marginBottom: "12px" }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "10.5px", fontWeight: 600, color: "#6366f1", letterSpacing: "0.04em" }}>{tag}</span>
      </div>
      <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "17px", fontWeight: 700, color: t.text, margin: "0 0 9px", letterSpacing: "-0.015em" }}>{title}</h3>
      <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "13.5px", lineHeight: 1.7, color: t.textMuted, margin: 0 }}>{desc}</p>
    </div>
  );
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const fade = useScrollFade(ref, 0.35);
  const { t } = useTheme();

  return (
    <div style={{ paddingTop: "62px" }}>
      {/* hero band */}
      <section style={{ padding: "80px 60px 60px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "12px", fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 12px", animation: "fadeUp 0.5s ease 0.1s both" }}>
          What's inside
        </p>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(34px,4.5vw,54px)", fontWeight: 800, letterSpacing: "-0.035em", color: t.text, margin: "0 auto 16px", lineHeight: 1.1, maxWidth: "700px", animation: "fadeUp 0.55s ease 0.18s both" }}>
          Everything you need to take <GradSpan>beautiful notes.</GradSpan>
        </h1>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "17px", color: t.textMuted, maxWidth: "520px", margin: "0 auto", lineHeight: 1.7, animation: "fadeUp 0.55s ease 0.26s both" }}>
          Nine carefully crafted features, built around one goal: turning raw transcripts into notes you actually want to keep.
        </p>
      </section>

      {/* grid */}
      <section style={{ padding: "20px 60px 120px" }}>
        <div ref={ref} style={{ ...fade, maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", transition: "opacity .08s,transform .08s" }}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={i} {...f} delay={0.05 + i * 0.06} />
          ))}
        </div>
      </section>
    </div>
  );
}
