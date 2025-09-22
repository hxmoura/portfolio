"use client";

import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  function handleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <button
      className="size-12 p-3 rounded-full bg-brand-50 dark:bg-brand-800 fixed bottom-10 right-4 lg:right-16 cursor-pointer flex items-center justify-center"
      onClick={handleTheme}
    >
      <Icon
        icon="ri:sun-line"
        className={`
      absolute w-6 h-6 transition-all duration-300 ease-in-out text-brand-500
      ${theme === "light" ? "rotate-0 opacity-100" : "rotate-180 opacity-0"}
    `}
      />
      <Icon
        icon="ri:moon-clear-line"
        className={`
      absolute w-6 h-6 transition-all duration-300 ease-in-out text-brand-300
      ${theme === "dark" ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"}
    `}
      />
    </button>
  );
}
