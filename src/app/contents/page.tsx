import BackButton from "@/components/backButton";
import Setup from "@/components/setup";
import Title from "@/components/title";
import { RiLink } from "@remixicon/react";
import Link from "next/link";

export default function Contents() {
  return (
    <Setup>
      <BackButton redirect="/" />
      <Title>Conteúdos</Title>
      <ul>
        {Array.from({ length: 8 }).map((_, index) => (
          <li
            key={index}
            className="border-b border-brand-500 dark:border-brand-300 border-dashed last:border-none"
          >
            <Link
              href="/"
              className="flex items-center justify-between py-4 text-brand-500 sm:hover:text-brand-700 dark:text-brand-300 sm:dark:hover:text-white transition-colors duration-300"
            >
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="flex items-center gap-3 ml-5">
                <small className="text-sm hidden sm:block">04/09/2025</small>
                <RiLink size={16} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Setup>
  );
}
