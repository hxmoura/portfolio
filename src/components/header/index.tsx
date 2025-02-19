import { RiAtLine, RiGithubFill, RiLinkedinFill } from "@remixicon/react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between">
      <h1 className="font-BlueParadise text-2xl">
        <Link href="/">hxmoura</Link>
      </h1>
      <div className="flex items-center gap-3">
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/hxmoura/"
          className="flex gap-2 items-center bg-[#0076B2] rounded-full py-2 px-2 sm:px-3 text-white sm:hover:-translate-y-1 transition-transform duration-300"
        >
          <span className="text-xs max-sm:hidden">Conecte-se comigo</span>
          <RiLinkedinFill size={20} />
        </Link>
        <Link
          target="_blank"
          href="https://github.com/hxmoura"
          className="bg-brand-50 dark:bg-brand-800 rounded-full p-2 sm:hover:-translate-y-1 transition-transform duration-300"
        >
          <RiGithubFill size={20} />
        </Link>
        <Link
          href="mailto:hxmoura@hotmail.com"
          className="bg-brand-50 dark:bg-brand-800 rounded-full p-2 sm:hover:-translate-y-1 transition-transform duration-300"
        >
          <RiAtLine size={20} />
        </Link>
      </div>
    </header>
  );
}
