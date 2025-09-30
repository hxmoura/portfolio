import PrimaryButton from "@/components/PrimaryButton";
import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import Title from "@/components/Title";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/dictionaries/config";
import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "pt";
  const preferred = acceptLanguage.split(",")[0].split("-")[0] as Locale;

  const dict = await getDictionary(preferred);

  return (
    <Setup dict={dict} lang={preferred}>
      <StaggedAnimation />

      <div className="flex flex-col items-center justify-center flex-1">
        <Title center noMargin>
          {dict.notFoundTitle}
        </Title>
        <p className="mt-3 mb-9 text-brand-500 dark:text-brand-300 text-center max-w-76 animation-blur">
          {dict.notFoundDescription}
        </p>
        <PrimaryButton onClick="/">{dict.notFoundButton}</PrimaryButton>
      </div>
    </Setup>
  );
}
