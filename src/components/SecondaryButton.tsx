"use client";

import {
  AnalyticsClickEvent,
  analyticsEventName,
} from "@/utils/AnalyticsEvents";
import Link from "next/link";

type SecondaryButton = {
  children: React.ReactNode;
  onClick: VoidFunction | string;
  openInNewTab?: boolean;
  analyticsClick?: {
    event: analyticsEventName;
    target: string;
  };
};

export default function SecondaryButton({
  children,
  onClick,
  openInNewTab,
  analyticsClick,
}: SecondaryButton) {
  function handleAnalyticsEvent() {
    if (analyticsClick) {
      AnalyticsClickEvent(analyticsClick.event, analyticsClick.target);
    }
  }

  return (
    <>
      {typeof onClick === "string" ? (
        <Link
          href={onClick}
          onClick={handleAnalyticsEvent}
          target={openInNewTab ? "_blank" : "_self"}
          className="rounded-lg py-2 px-3 bg-brand-50 dark:bg-brand-700 animation-blur sm:hover:-translate-y-1 transition-transform duration-300 text-sm flex items-center justify-center gap-2 min-h-10"
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={() => {
            onClick();
            handleAnalyticsEvent();
          }}
          className="rounded-lg py-2 px-3 bg-brand-50 dark:bg-brand-700 animation-blur sm:hover:-translate-y-1 transition-transform duration-300 text-sm flex items-center justify-center gap-2 cursor-pointer min-h-10"
        >
          {children}
        </button>
      )}
    </>
  );
}
