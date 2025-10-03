"use client";

import {
  AnalyticsClickEvent,
  analyticsEventName,
} from "@/utils/AnalyticsEvents";
import Link from "next/link";

type PrimaryButton = {
  children: React.ReactNode;
  href: string;
  openInNewTab?: boolean;
  analyticsClick?: {
    event: analyticsEventName;
    target: string;
  };
};

export default function PrimaryButton({
  children,
  href,
  openInNewTab,
  analyticsClick,
}: PrimaryButton) {
  function handleAnalyticsClick() {
    if (analyticsClick) {
      AnalyticsClickEvent(analyticsClick.event, analyticsClick.target);
    }
  }

  return (
    <Link
      href={href}
      onClick={handleAnalyticsClick}
      target={openInNewTab ? "_blank" : "_self"}
      className="rounded-xl py-2 px-7 animation-blur text-sm flex items-center justify-center gap-1 h-10 transition-colors bg-primary/70 hover:bg-primary-dark text-white"
    >
      {children}
    </Link>
  );
}
