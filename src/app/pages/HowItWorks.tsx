"use client";

import { useRef, useState } from "react";
import { BookOpen, Wand2, Check, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "../theme";
import { useScrollFade, GradSpan } from "../shared";

const STEPS = [
  {
    n: "01",
    icon: <BookOpen size={24} color="#6366f1" />,
    title: "Paste your transcript",
    desc: "Drop in raw lecture text, audio transcription export, or a dense outline — even messy unstructured notes work perfectly. InkFlow handles the rest.",
    detail: ["Accepts plain text, Word docs, and audio-to-text output", "No minimum length — a few sentences to an hour-long lecture", "Supports 42 languages out of the box"],
  },
  {
    n: "02",
    icon: <Wand2 size={24} color="#8b5cf6" />,
    title: "Choose your style",
    desc: "Select a paper type (Lined, Dotted, or Blank), a handwriting palette (Classic Ink, Pastel, Minimal), and a font size. The preview updates in real time.",
    detail: ["Live A4 canvas preview — no lag, no refresh", "Heading, bullet, and highlight colours adjust per palette", "Save custom presets for your most-used combinations"],
  },
  {
    n: "03",
    icon: <Check size={24} color="#10b981" />,
    title: "Generate & export",
    desc: "Hit Generate. Notes appear written in ~3 seconds. Export as a high-res PDF, lossless PNG, or share a read-only link — all from the floating toolbar.",
    detail: ["PDF export preserves vector text at any zoom", "PNG at 300 DPI — print-ready out of the box", "Share link expires after 7 days for privacy"],
  },
];

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const { t } = useTheme();
  const [hov, setHov] = useState(false);
  const delay = index * 0.14;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0", animation: `fadeUp 0.6s ease ${0.2 + delay}s both` }}>
      {/* connector line above (not first) */}
      {index > 0 && (
        <div style={{ height: "48px", width: "2px", background: `linear-gradient(to bottom, #6366f1, #8b5cf6)`, borderRadius: "1px", margin: "0 auto", opacity: 0.3 }} />
      )}

      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ borderRadius: "24px", background: t.bg, boxShadow: hov ? t.inset : t.raised, padding: "36px 32px", transition: "box-shadow 0.3s, transform 0.25s", transform: hov ? "translateY(2px)" : "translateY(0)", cursor: "default" }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
          {/* step bubble */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: t.bg, boxShadow: hov ? t.raised : t.inset, display: "flex", alignItems: "center", justifyContent: "center", transition: "box-shadow 0.3s" }}>
              {step.icon}
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "11px", fontWeight: 800, color: "#6366f1", letterSpacing: "0.1em", opacity: 0.7 }}>{step.n}</span>
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "20px", fontWeight: 700, color: t.text, margin: "0 0 10px", letterSpacing: "-0.02em" }}>{step.title}</h3>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "14.5px", lineHeight: 1.75, color: t.textMuted, margin: "0 0 18px" }}>{step.desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {step.detail.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: t.bg, boxShadow: t.raisedSm, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={10} color="#10b981" strokeWidth={3} />
                  </div>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "13px", color: t.textMuted, lineHeight: 1.5 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const { t } = useTheme();
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const fade = useScrollFade(ref, 0.35);

  const items = [
    { q: "What formats can I paste in?", a: "Plain text, Markdown, Word-exported text, and common audio-to-text outputs (Otter.ai, Whisper, Google Meet transcripts). Formatting is stripped and re-applied intelligently." },
    { q: "Can I edit the generated notes?", a: "Yes. Once generated, every line is editable inline on the canvas. Changes reflect in the export without needing to regenerate." },
    { q: "How accurate is the AI structuring?", a: "Very accurate for well-formed academic content. For highly technical or domain-specific content (advanced maths, medical), we recommend a quick review of heading hierarchy." },
    { q: "Is my transcript stored anywhere?", a: "No. Transcripts are processed ephemerally in memory and discarded immediately after note generation. Nothing is logged or used for model training." },
  ];

  return (
    <section style={{ padding: "60px 60px 120px" }}>
      <div ref={ref} style={{ ...fade, maxWidth: "720px", margin: "0 auto", transition: "opacity .08s,transform .08s" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "12px", fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 12px", textAlign: "center" }}>FAQ</p>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "34px", fontWeight: 800, letterSpacing: "-0.03em", color: t.text, margin: "0 0 40px", textAlign: "center", lineHeight: 1.15 }}>Common questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {items.map((item, i) => (
            <div key={i} onClick={() => setOpen(open === i ? null : i)}
              style={{ borderRadius: "16px", background: t.bg, boxShadow: open === i ? t.inset : t.raisedSm, padding: "20px 24px", cursor: "pointer", transition: "box-shadow 0.25s" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "15px", fontWeight: 600, color: t.text }}>{item.q}</span>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: t.bg, boxShadow: open === i ? t.inset : t.raisedSm, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.25s, transform 0.25s", transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }}>
                  <ArrowRight size={13} color="#6366f1" />
                </div>
              </div>
              {open === i && (
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "14px", color: t.textMuted, lineHeight: 1.75, margin: "14px 0 0", animation: "fadeUp 0.25s ease both" }}>{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HowItWorks() {
  const { t } = useTheme();
  const router = useRouter();

  return (
    <div style={{ paddingTop: "62px" }}>
      {/* header */}
      <section style={{ padding: "80px 60px 48px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "12px", fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 12px", animation: "fadeUp 0.5s ease 0.1s both" }}>Process</p>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 800, letterSpacing: "-0.035em", color: t.text, margin: "0 auto 16px", lineHeight: 1.1, maxWidth: "640px", animation: "fadeUp 0.55s ease 0.18s both" }}>
          Three steps to <GradSpan>perfect notes.</GradSpan>
        </h1>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "17px", color: t.textMuted, maxWidth: "480px", margin: "0 auto", lineHeight: 1.7, animation: "fadeUp 0.55s ease 0.26s both" }}>
          From raw transcript to export-ready handwritten notes in under a minute.
        </p>
      </section>

      {/* steps */}
      <section style={{ padding: "0 60px 60px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column" }}>
          {STEPS.map((s, i) => <StepCard key={i} step={s} index={i} />)}
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ padding: "0 60px 80px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ borderRadius: "24px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", padding: "48px 40px", textAlign: "center", boxShadow: "0 16px 48px rgba(99,102,241,0.35)", animation: "fadeUp 0.6s ease 0.7s both" }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "26px", fontWeight: 800, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.02em" }}>Ready to try it?</h3>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.75)", margin: "0 0 28px", lineHeight: 1.6 }}>Paste your first transcript and generate handwritten notes in seconds — no sign-up required.</p>
            <button onClick={() => router.push("/demo")}
              style={{ padding: "14px 32px", borderRadius: "12px", border: "none", background: "#fff", color: "#6366f1", fontSize: "15px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", transition: "transform 0.15s, box-shadow 0.15s", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)"; }}
            >
              Open the Demo <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}
