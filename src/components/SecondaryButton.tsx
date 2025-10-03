"use client";

import {
  AnalyticsClickEvent,
  analyticsEventName,
} from "@/utils/AnalyticsEvents";
import Link from "next/link";

type SecondaryButton = {
  children: React.ReactNode;
  href: string;
  openInNewTab?: boolean;
  analyticsClick?: {
    event: analyticsEventName;
    target: string;
  };
};

export default function SecondaryButton({
  children,
  href,
  openInNewTab,
  analyticsClick,
}: SecondaryButton) {
  function handleAnalyticsEvent() {
    if (analyticsClick) {
      AnalyticsClickEvent(analyticsClick.event, analyticsClick.target);
    }
  }

  return (
    <Link
      href={href}
      onClick={handleAnalyticsEvent}
      target={openInNewTab ? "_blank" : "_self"}
      className="rounded-xl py-2 px-7 animation-blur border text-sm flex items-center justify-center gap-2 h-10 bg-brand-50 border-brand-500 text-brand-500 dark:bg-brand-800 dark:border-brand-700 dark:text-brand-500 hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors"
    >
      {children}
    </Link>
  );
}
