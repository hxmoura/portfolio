"use client";

import { Locale } from "@/dictionaries/config";
import { createContext, ReactNode, useContext } from "react";

export type TranslationValue = {
  dict: Record<string, string>;
  lang: Locale;
};

export const DictContext = createContext<TranslationValue | null>(null);

export function DictProvider({
  value,
  children,
}: {
  value: TranslationValue;
  children: ReactNode;
}) {
  return <DictContext.Provider value={value}>{children}</DictContext.Provider>;
}

export function useTranslation() {
  return useContext(DictContext)!;
}
