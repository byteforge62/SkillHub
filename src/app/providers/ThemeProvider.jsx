import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState("dark");

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    let resolved = theme;
    if (theme === "system") {
      resolved = systemDark ? "dark" : "light";
    }

    setResolvedTheme(resolved);
    root.setAttribute("data-theme", resolved);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      if (theme === "system") {
        const resolved = e.matches ? "dark" : "light";
        setResolvedTheme(resolved);
        document.documentElement.setAttribute("data-theme", resolved);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme,
  }), [theme, resolvedTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;