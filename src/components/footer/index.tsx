"use client";

import animationBlur from "@/utils/animationBlur";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

type FooterProps = {
  animationBlurLevel?: number;
};

export default function Footer({ animationBlurLevel }: FooterProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function handleTheme() {
    setTheme(
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    );
  }

  return (
    <footer
      className={`flex flex-col items-center gap-2 ${
        animationBlurLevel && animationBlur(animationBlurLevel)
      }`}
    >
      <div className="flex gap-5 justify-center flex-wrap">
        <p className="text-sm text-brand-500 dark:text-brand-300">
          Tema:{" "}
          <button className="underline cursor-pointer" onClick={handleTheme}>
            {theme === "dark"
              ? "Escuro"
              : theme === "system"
              ? "Sistema"
              : "Claro"}
          </button>
        </p>
        <p className="text-sm text-brand-500 dark:text-brand-300">
          Idioma:{" "}
          <button className="underline cursor-pointer">Português</button>
        </p>
        <button className="text-sm text-brand-500 dark:text-brand-300">
          <Link
            target="_blank"
            href="https://github.com/hxmoura/portfolio-v2"
            className="underline"
          >
            Código
          </Link>
        </button>
      </div>
      <p className="text-sm text-brand-500 dark:text-brand-300 text-center">
        © hxmoura {new Date().getFullYear()} - Todos os direitos reservados
      </p>
    </footer>
  );
}
