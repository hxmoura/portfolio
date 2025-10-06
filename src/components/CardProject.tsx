"use client";

import Link from "next/link";

type Props = {
  title: string;
  description: string;
  redirectUrl: string;
  icon: string;
};

export default function CardProject({
  title,
  description,
  redirectUrl,
  icon,
}: Props) {
  return (
    <Link
      href={redirectUrl}
      className="py-5 w-full px-4 flex gap-2 hover:bg-brand-50/60 dark:hover:bg-brand-800/60 rounded-lg animation-blur transition-colors duration-300"
    >
      <p className="text-lg">{icon}</p>

      <div className="space-y-1">
        <h6 className="font-semibold text-brand-700 dark:text-white">
          {title.toUpperCase()}
        </h6>
        <p className="text-sm text-brand-500 dark:text-brand-300">
          {description}
        </p>
      </div>
    </Link>
  );
}
