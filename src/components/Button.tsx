"use client";

import { useTranslation } from "@/contexts/DictContext";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
  arrowLeft?: boolean;
}

export default function Button({
  children,
  href,
  className,
  arrowLeft,
}: Props) {
  const { lang } = useTranslation();

  return (
    <Link
      href={`/${lang}${href}`}
      className={`flex items-center gap-1 cursor-pointer group hover:underline w-fit animation-blur ${
        className ?? ""
      }`}
    >
      {arrowLeft && <Icon icon="ri:arrow-left-line" fontSize={16} />}
      {children}
      {!arrowLeft && (
        <Icon
          icon="ri:arrow-right-line"
          fontSize={16}
          className="sm:group-hover:translate-x-1.5 transition-transform duration-300"
        />
      )}
    </Link>
  );
}
