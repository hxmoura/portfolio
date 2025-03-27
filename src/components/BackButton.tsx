import { RiArrowLeftLine } from "@remixicon/react";
import Link from "next/link";

type BackButtonProps = {
  redirect: string;
};

export default function BackButton({ redirect }: BackButtonProps) {
  return (
    <Link
      href={redirect}
      className="flex items-center gap-1 text-sm text-brand-500 dark:text-brand-300 w-fit animation-blur"
    >
      <RiArrowLeftLine size={16} />
      <span>Voltar</span>
    </Link>
  );
}
