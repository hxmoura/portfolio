"use client";

import { Icon } from "@iconify/react";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function ToggleLanguage() {
  const router = useRouter();
  const { lang } = useParams<{ lang: string }>();
  const pathname = usePathname();

  const currentLang = lang || "en";
  const nextLang = currentLang === "en" ? "pt" : "en";

  const handleClick = () => {
    const newPath = pathname.replace(`/${currentLang}`, `/${nextLang}`);
    router.push(newPath);
  };

  return (
    <button
      className="border border-brand-50 dark:border-brand-700 rounded-full p-1 h-10 w-24 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative flex items-center justify-center gap-6 bg-red-400">
        <Icon
          icon="twemoji:flag-brazil"
          height={16}
          width={24}
          className="z-20 absolute left-2"
        />
        <Icon
          icon="twemoji:flag-us-outlying-islands"
          height={16}
          width={24}
          className="z-20 absolute right-2.5"
        />
        <div
          className={`bg-brand-50 dark:bg-brand-700 left-0 transition-transform h-8 w-11 absolute rounded-full ${
            lang === "pt" ? "translate-x-0" : "translate-x-10.5"
          }`}
        />
      </div>
    </button>
  );
}
