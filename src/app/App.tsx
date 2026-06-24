import { ThemeProvider } from "./theme";

export default function App({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
