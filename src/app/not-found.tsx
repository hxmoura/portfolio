import Setup from "@/components/setup";
import StaggedAnimation from "@/components/staggedAnimation";
import Title from "@/components/title";
import Link from "next/link";

export default function NotFound() {
  return (
    <Setup>
      <StaggedAnimation />
      <div className="flex flex-col items-center justify-center flex-1">
        <Title center noMargin>
          Oops! A página não foi encontrada.
        </Title>
        <p className="mt-3 mb-9 text-brand-500 dark:text-brand-300 text-center max-w-76 animation-blur">
          Pode ser que você digitou a URL errada, ou a página não está mais
          disponível.
        </p>
        <Link
          href="/"
          className="rounded-lg py-2 px-3 text-white bg-brand-700 dark:bg-white dark:text-brand-700 animation-blur sm:hover:-translate-y-1 transition-transform duration-300 text-sm"
        >
          Voltar para o início
        </Link>
      </div>
    </Setup>
  );
}
