import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const THEMES = [
  {
    id: "nova",
    name: "Nova",
    description: "Magenta, violet, and electric cyan",
    colors: ["#ff3dce", "#7c5cff", "#19e6ff"],
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Coral, orange, and golden light",
    colors: ["#ff4d67", "#ff8a3d", "#ffd166"],
  },
  {
    id: "lagoon",
    name: "Lagoon",
    description: "Aqua, blue, and deep indigo",
    colors: ["#19e6c4", "#2f8cff", "#675cff"],
  },
  {
    id: "volt",
    name: "Volt",
    description: "Lime, mint, and electric blue",
    colors: ["#b7ff4a", "#00e7a7", "#15a7ff"],
  },
  {
    id: "monochrome",
    name: "Monochrome",
    description: "Silver, graphite, and soft white",
    colors: ["#f7f7ff", "#a1a3b4", "#626574"],
  },
];

const STORAGE_KEY = "noctura-theme";
const ThemeContext = createContext(null);

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (THEMES.some((theme) => theme.id === saved)) {
      return saved;
    }
  } catch {
    // Storage can be unavailable in private browsing environments.
  }

  return "nova";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // The selected theme still works for the current session.
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      themes: THEMES,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
