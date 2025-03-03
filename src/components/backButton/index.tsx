import animationBlur from "@/utils/animationBlur";
import { RiArrowLeftLine } from "@remixicon/react";
import Link from "next/link";

type BackButtonProps = {
  redirect: string;
  animationBlurLevel?: number;
};

export default function BackButton({
  redirect,
  animationBlurLevel,
}: BackButtonProps) {
  return (
    <Link
      href={redirect}
      className={`flex items-center gap-1 text-sm text-brand-500 dark:text-brand-300 w-fit ${
        animationBlurLevel && animationBlur(animationBlurLevel)
      }`}
    >
      <RiArrowLeftLine size={16} />
      <span>Voltar</span>
    </Link>
  );
}
