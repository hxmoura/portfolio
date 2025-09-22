import Link from "next/link";
import ToggleLanguage from "./ToggleLanguage";

export default function Header() {
  return (
    <header className="flex justify-between animation-blur">
      <div>
        <h1 className="text-lg font-semibold h-7 overflow-hidden">
          <Link href="/" className="flex flex-col group">
            <span className="group-hover:-translate-y-7 transition-transform ease-in-out">
              Henrique Moura
            </span>
            <span className="group-hover:-translate-y-7 transition-transform ease-in-out">
              hxmoura
            </span>
          </Link>
        </h1>
        <p className="text-brand-500 dark:text-brand-300 text-sm">
          Desenvolvedor Full-Stack
        </p>
      </div>
      <ToggleLanguage />
    </header>
  );
}
