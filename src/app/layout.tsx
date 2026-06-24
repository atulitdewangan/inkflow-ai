"use client";

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeProvider, useTheme } from "./theme";
import "../styles/index.css";

function Nav() {
  const pathname = usePathname();
  const { dark, toggle, t } = useTheme();

  const links = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/demo", label: "Demo" },
  ];

  const pinned = typeof window !== "undefined" && window.scrollY > 60;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "62px",
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        transition: "background 0.35s, border-color 0.35s, box-shadow 0.35s, backdrop-filter 0.35s",
        background: pinned ? t.navBg : "transparent",
        backdropFilter: pinned ? "blur(20px)" : "none",
        borderBottom: `1px solid ${pinned ? t.glassBorder : "transparent"}`,
        boxShadow: pinned ? t.glassShadow : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "10px",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `4px 4px 12px ${t.shadow}, -2px -2px 8px ${t.light}, 0 4px 16px rgba(99,102,241,0.35)`,
            cursor: "pointer",
          }}
        >
          <span style={{ color: "white", fontSize: "14px", fontWeight: 700 }}>I</span>
        </div>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: t.text,
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              cursor: "pointer",
            }}
          >
            InkFlow<span style={{ color: "#6366f1" }}>AI</span>
          </span>
        </Link>
        <button
          onClick={toggle}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: t.bg,
            boxShadow: t.raisedSm,
            color: dark ? "#f59e0b" : "#6366f1",
            transition: "box-shadow 0.2s, transform 0.2s, color 0.3s",
            marginLeft: "4px",
          }}
        >
          {dark ? "☀" : "🌙"}
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "6px" }}>
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: "13.5px",
                fontWeight: active ? 600 : 500,
                color: active ? "#6366f1" : t.textMuted,
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: "10px",
                background: active ? (dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.08)") : "transparent",
                transition: "color 0.2s, background 0.2s",
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <Link href="/demo" style={{ textDecoration: "none" }}>
        <button
          style={{
            padding: "9px 22px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "#fff",
            fontSize: "13.5px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            boxShadow: `4px 4px 14px ${t.shadow}, -2px -2px 8px ${t.light}, 0 4px 18px rgba(99,102,241,0.35)`,
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
        >
          Try free →
        </button>
      </Link>
    </nav>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh", margin: 0, background: "#E4E0D8", transition: "background 0.4s ease", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        <ThemeProvider>
          <div className="hide-scrollbar" style={{ minHeight: "100vh" }}>
            <Nav />
            <div style={{ animation: "pageEnter 0.4s ease both", paddingTop: "82px" }}>{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
