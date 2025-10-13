"use client";

import { useTranslation } from "@/contexts/DictContext";
import {
  AnalyticsClickEvent,
  analyticsEventName,
} from "@/utils/AnalyticsEvents";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  arrow?: "left" | "right";
  className?: string;
  analyticsClick?: {
    event: analyticsEventName;
    target: string;
  };
  noAnimation?: boolean;
};

export default function CustomLink({
  children,
  href,
  external,
  arrow,
  className,
  analyticsClick,
  noAnimation,
}: Props) {
  const { lang } = useTranslation();

  function handleAnalyticsClick() {
    if (analyticsClick) {
      AnalyticsClickEvent(analyticsClick.event, analyticsClick.target);
    }
  }

  return (
    <Link
      href={external ? href : `/${lang}${href}`}
      onClick={handleAnalyticsClick}
      target={external ? "_blank" : "_self"}
      className={`flex items-center gap-1 underline group w-fit hover:text-brand-700 dark:hover:text-white ${
        className ?? ""
      } ${!noAnimation && "animation-blur"}`}
    >
      {arrow === "left" && <Icon icon="ri:arrow-left-line" fontSize={16} />}

      {children}

      {arrow === "right" && (
        <Icon
          icon="ri:arrow-right-line"
          fontSize={16}
          className="sm:group-hover:translate-x-1.5 transition-transform duration-300"
        />
      )}
    </Link>
  );
}
