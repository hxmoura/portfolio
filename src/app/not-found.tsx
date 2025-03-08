import PrimaryButton from "@/components/primaryButton";
import Setup from "@/components/setup";
import StaggedAnimation from "@/components/staggedAnimation";
import Title from "@/components/title";

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
        <PrimaryButton onClick="/">Voltar para o inicio</PrimaryButton>
      </div>
    </Setup>
  );
}
