"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeProvider = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: ThemeOptions;
  handleTheme: VoidFunction;
};

type ThemeOptions = "dark" | "light" | "system";
const themes: ThemeOptions[] = ["dark", "light", "system"];

const ThemeContext = createContext<ThemeContextType | null>(null);
export const useTheme = () => useContext(ThemeContext)!;

export function ThemeProvider({ children }: ThemeProvider) {
  const [theme, setTheme] = useState<ThemeOptions>("system");

  const updateTheme = useCallback((theme: ThemeOptions) => {
    setTheme(theme);
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, []);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const getTheme = localStorage.getItem("theme") as ThemeOptions;
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      updateTheme(themes.includes(getTheme) ? getTheme : "system");

      function handleSystemTheme(e: MediaQueryListEvent) {
        if (theme === "system") {
          applyTheme(e.matches ? "dark" : "light");
        }
      }

      mediaQuery.addEventListener("change", handleSystemTheme);
      return () => mediaQuery.removeEventListener("change", handleSystemTheme);
    }
  }, [updateTheme, theme]);

  function applyTheme(theme: ThemeOptions) {
    const setAttr = () =>
      document.documentElement.setAttribute("data-theme", "dark");
    const removeAttr = () =>
      document.documentElement.removeAttribute("data-theme");

    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (theme === "dark") {
      return setAttr();
    } else if (theme === "light") {
      return removeAttr();
    } else {
      return systemDark ? setAttr() : removeAttr();
    }
  }

  function handleTheme() {
    const newTheme =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    updateTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ handleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
