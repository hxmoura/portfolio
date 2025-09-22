"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

type ProjectProps = {
  title: string;
  description: string;
  redirectUrl: string;
};

export default function Project({
  title,
  description,
  redirectUrl,
}: ProjectProps) {
  return (
    <Link
      href={redirectUrl}
      className="py-5 w-full px-4 flex gap-2 hover:bg-brand-50/60 dark:hover:bg-brand-800/60 rounded-lg animation-blur"
    >
      <Icon icon="fluent-emoji-flat:high-voltage" className="min-w-6 min-h-6" />

      <div className="space-y-1">
        <h6 className="font-semibold">{title.toUpperCase()}</h6>
        <p className="text-sm text-brand-500 dark:text-brand-300">
          {description}
        </p>
      </div>
    </Link>
  );
}
