import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/* ── Palette tokens ── */
export const LIGHT = {
  bg: "#E4E0D8",
  shadow: "#C6C2BB",
  light: "#FFFFFF",
  text: "#1a1714",
  textMuted: "#6b6560",
  textFaint: "#9b9690",
  raised: "10px 10px 28px #C6C2BB, -10px -10px 28px #FFFFFF",
  raisedSm: "6px 6px 16px #C6C2BB, -6px -6px 16px #FFFFFF",
  inset: "inset 6px 6px 16px #C6C2BB, inset -6px -6px 16px #FFFFFF",
  insetDeep: "inset 8px 8px 20px #C0BCB5, inset -8px -8px 20px #FFFFFF",
  glass: "rgba(255,255,255,0.48)",
  glassBorder: "rgba(255,255,255,0.75)",
  glassShadow: "0 4px 24px rgba(0,0,0,0.07)",
  navBg: "rgba(228,224,216,0.85)",
  divider: "rgba(0,0,0,0.07)",
  labelColor: "#4b4845",
};

export const DARK = {
  bg: "#252220",
  shadow: "#161412",
  light: "#342F2C",
  text: "#EDE8DF",
  textMuted: "#A8A099",
  textFaint: "#6E6860",
  raised: "10px 10px 28px #161412, -10px -10px 28px #342F2C",
  raisedSm: "6px 6px 16px #161412, -6px -6px 16px #342F2C",
  inset: "inset 6px 6px 16px #161412, inset -6px -6px 16px #342F2C",
  insetDeep: "inset 8px 8px 20px #121110, inset -8px -8px 20px #342F2C",
  glass: "rgba(52,47,44,0.55)",
  glassBorder: "rgba(255,255,255,0.09)",
  glassShadow: "0 4px 24px rgba(0,0,0,0.3)",
  navBg: "rgba(30,28,26,0.88)",
  divider: "rgba(255,255,255,0.07)",
  labelColor: "#A8A099",
};

export type Theme = typeof LIGHT;

interface ThemeCtx {
  dark: boolean;
  toggle: () => void;
  t: Theme;
}

const Ctx = createContext<ThemeCtx>({ dark: false, toggle: () => {}, t: LIGHT });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const toggle = () => setDark((d) => !d);
  const t = dark ? DARK : LIGHT;

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.transition = "background 0.4s ease";
  }, [dark]);

  return <Ctx.Provider value={{ dark, toggle, t }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  return useContext(Ctx);
}
