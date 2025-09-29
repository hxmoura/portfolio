import { Icon } from "@iconify/react";
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
      <Icon icon="ri:arrow-left-line" width={16} height={16} />
      <span>Voltar</span>
    </Link>
  );
}
