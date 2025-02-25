"use client";

import { useTheme } from "@/context/ThemeContext";
import animationBlur from "@/utils/animationBlur";
import Link from "next/link";

type FooterProps = {
  animationBlurLevel?: number;
};

export default function Footer({ animationBlurLevel }: FooterProps) {
  const { theme, handleTheme } = useTheme();

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
            {theme === "dark" && "Escuro"}
            {theme === "light" && "Claro"}
            {theme === "system" && "Sistema"}
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
