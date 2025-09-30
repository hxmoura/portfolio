import { Locale } from "@/dictionaries/config";
import Link from "next/link";
import ToggleLanguage from "./ToggleLanguage";

type Props = {
  dict: Record<string, string>;
  lang: Locale;
};

export default function Header({ dict, lang }: Props) {
  return (
    <header className="flex justify-between animation-blur z-50">
      <div>
        <h1 className="text-lg font-semibold h-7 overflow-hidden">
          <Link
            href={`/${lang}/`}
            className="flex flex-col group text-brand-700 dark:text-white"
          >
            <span className="group-hover:-translate-y-7 transition-transform ease-in-out">
              Henrique Moura
            </span>
            <span className="group-hover:-translate-y-7 transition-transform ease-in-out">
              hxmoura
            </span>
          </Link>
        </h1>
        <p className="text-brand-500 dark:text-brand-300 text-sm">
          {dict.subheader}
        </p>
      </div>
      <ToggleLanguage />
    </header>
  );
}
