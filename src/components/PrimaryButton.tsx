"use client";

import {
  AnalyticsClickEvent,
  analyticsEventName,
} from "@/utils/AnalyticsEvents";
import Link from "next/link";
import { FormEvent } from "react";

type PrimaryButton = {
  children: React.ReactNode;
  onClick: VoidFunction | string | ((evt: FormEvent) => void);
  openInNewTab?: boolean;
  analyticsClick?: {
    event: analyticsEventName;
    target: string;
  };
};

export default function PrimaryButton({
  children,
  onClick,
  openInNewTab,
  analyticsClick,
}: PrimaryButton) {
  function handleAnalyticsClick() {
    if (analyticsClick) {
      AnalyticsClickEvent(analyticsClick.event, analyticsClick.target);
    }
  }

  return (
    <>
      {typeof onClick === "string" ? (
        <Link
          href={onClick}
          onClick={handleAnalyticsClick}
          target={openInNewTab ? "_blank" : "_self"}
          className="rounded-lg py-2 px-3 text-white bg-brand-700 dark:bg-white dark:text-brand-700 animation-blur sm:hover:-translate-y-1 transition-transform duration-300 text-sm flex items-center justify-center gap-2 min-h-10"
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={(evt) => {
            onClick(evt);
            handleAnalyticsClick();
          }}
          className="rounded-lg py-2 px-3 text-white bg-brand-700 dark:bg-white dark:text-brand-700 animation-blur sm:hover:-translate-y-1 transition-transform duration-300 text-sm flex items-center justify-center gap-2 cursor-pointer min-h-10"
        >
          {children}
        </button>
      )}
    </>
  );
}
