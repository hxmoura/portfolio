"use client";

import { useTranslation } from "@/contexts/DictContext";
import {
  AnalyticsClickEvent,
  analyticsEventName,
} from "@/utils/AnalyticsEvents";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href: string;
  openInNewTab?: boolean;
  analyticsClick?: {
    event: analyticsEventName;
    target: string;
  };
  type: "primary" | "secondary";
};

export default function Button({
  children,
  href,
  openInNewTab,
  analyticsClick,
  type,
}: Props) {
  const { lang } = useTranslation();

  function handleAnalyticsClick() {
    if (analyticsClick) {
      AnalyticsClickEvent(analyticsClick.event, analyticsClick.target);
    }
  }

  return (
    <>
      {type === "primary" && (
        <Link
          href={openInNewTab ? href : `/${lang}${href}`}
          onClick={handleAnalyticsClick}
          target={openInNewTab ? "_blank" : "_self"}
          className="rounded-xl py-2 px-7 animation-blur text-sm flex items-center justify-center gap-1 h-10 transition-colors bg-brand-700 text-white dark:text-brand-700 dark:bg-white dark:hover:bg-white/80 hover:bg-brand-700/80"
        >
          {children}
        </Link>
      )}

      {type === "secondary" && (
        <Link
          href={openInNewTab ? href : `/${lang}${href}`}
          onClick={handleAnalyticsClick}
          target={openInNewTab ? "_blank" : "_self"}
          className="rounded-xl py-2 px-7 animation-blur border text-sm flex items-center justify-center gap-2 h-10 dark:bg-brand-800 dark:border-brand-700 dark:text-brand-500 dark:hover:bg-brand-800/50 bg-brand-50 border-brand-300/30 hover:bg-brand-50/50"
        >
          {children}
        </Link>
      )}
    </>
  );
}
