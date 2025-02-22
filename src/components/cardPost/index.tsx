import animationBlur from "@/utils/animationBlur";
import { RiLink } from "@remixicon/react";
import Link from "next/link";

type CardPostProps = {
  redirectUrl: string;
  title: string;
  date: string;
  animationBlurLevel?: number;
};

export default function CardPost({
  redirectUrl,
  title,
  date,
  animationBlurLevel,
}: CardPostProps) {
  return (
    <article
      className={`group ${
        animationBlurLevel && animationBlur(animationBlurLevel)
      }`}
    >
      <Link
        href={redirectUrl}
        className="flex justify-between p-3 sm:group-hover:bg-brand-50 sm:dark:group-hover:bg-brand-800 rounded-lg transition-colors duration-300 text-brand-500 sm:group-hover:text-brand-700 dark:text-brand-300 sm:dark:group-hover:text-white"
      >
        <p className="line-clamp-1 mr-3">{title}</p>

        <div className="flex gap-3 items-center">
          <small className="text-sm max-sm:hidden">{date}</small>
          <RiLink size={16} />
        </div>
      </Link>
    </article>
  );
}
