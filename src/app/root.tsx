import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Feather, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme";
import { StyleTag } from "./shared";

function Nav() {
  const { dark, toggle, t } = useTheme();
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const pinned = scrollY > 60;

  const links = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/how-it-works", label: "How it works" },
    { to: "/demo", label: "Demo" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: "62px", display: "flex", alignItems: "center", padding: "0 32px",
      transition: "background 0.35s, border-color 0.35s, box-shadow 0.35s, backdrop-filter 0.35s",
      background: pinned ? t.navBg : "transparent",
      backdropFilter: pinned ? "blur(20px)" : "none",
      borderBottom: `1px solid ${pinned ? t.glassBorder : "transparent"}`,
      boxShadow: pinned ? t.glassShadow : "none",
    }}>
      {/* brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              width: "32px", height: "32px", borderRadius: "10px",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `4px 4px 12px ${t.shadow}, -2px -2px 8px ${t.light}, 0 4px 16px rgba(99,102,241,0.35)`,
              cursor: "pointer",
              animation: "floatY 4s ease-in-out infinite",
            }}
          >
            <Feather size={14} color="white" strokeWidth={2.3} />
          </div>
        </Link>

        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.025em", color: t.text, fontFamily: "'Plus Jakarta Sans',sans-serif", cursor: "pointer" }}
          >
            InkFlow<span style={{ color: "#6366f1" }}>AI</span>
          </span>
        </Link>

        {/* dark mode toggle — right after logo */}
        <button
          onClick={toggle}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            width: "34px", height: "34px", borderRadius: "10px",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: t.bg,
            boxShadow: t.raisedSm,
            color: dark ? "#f59e0b" : "#6366f1",
            transition: "box-shadow 0.2s, transform 0.2s, color 0.3s",
            marginLeft: "4px",
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = t.inset; e.currentTarget.style.transform = "scale(1.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = t.raisedSm; e.currentTarget.style.transform = "scale(1)"; }}
        >
          {dark
            ? <Sun size={15} strokeWidth={2.2} />
            : <Moon size={15} strokeWidth={2.2} />
          }
        </button>
      </div>

      {/* nav links — desktop */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "6px" }}>
        {links.map(({ to, label }) => {
          const active = pathname === to;
          return (
            <Link key={to} href={to} style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: "13.5px", fontWeight: active ? 600 : 500,
              color: active ? "#6366f1" : t.textMuted,
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: "10px",
              background: active ? (dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.08)") : "transparent",
              transition: "color 0.2s, background 0.2s",
            }}>
              {label}
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <Link href="/demo" style={{ textDecoration: "none" }}>
        <button style={{
          padding: "9px 22px", borderRadius: "10px", border: "none",
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          color: "#fff", fontSize: "13.5px", fontWeight: 600, cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          boxShadow: `4px 4px 14px ${t.shadow}, -2px -2px 8px ${t.light}, 0 4px 18px rgba(99,102,241,0.35)`,
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Try free →
        </button>
      </Link>
    </nav>
  );
}

export default function Root() {
  const { t, dark } = useTheme();
  return (
    <div className="hide-scrollbar" style={{ minHeight: "100vh", background: t.bg, transition: "background 0.4s ease", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <StyleTag />
      <Nav />
      <div style={{ animation: "pageEnter 0.4s ease both" }}>
        <div />
      </div>
    </div>
  );
}
