import { DictProvider } from "@/contexts/DictContext";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/dictionaries/config";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <DictProvider value={{ dict, lang }}>{children}</DictProvider>;
}
