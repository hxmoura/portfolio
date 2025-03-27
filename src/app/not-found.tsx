import PrimaryButton from "@/components/PrimaryButton";
import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import Title from "@/components/Title";

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
