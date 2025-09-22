"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

export default function ToggleLanguage() {
  const [language, setLanguage] = useState<"en" | "pt">("pt");

  const handleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pt" : "en"));
  };

  return (
    <button
      className="border border-brand-50 dark:border-brand-700 rounded-full p-1 h-10 w-24 cursor-pointer"
      onClick={handleLanguage}
    >
      <div className="relative flex items-center justify-center gap-6">
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
            language === "pt" ? "translate-x-0" : "translate-x-10.5"
          }`}
        />
      </div>
    </button>
  );
}
