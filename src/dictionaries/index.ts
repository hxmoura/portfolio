import "server-only";
import { Locale } from "./config";

export async function getDictionary(locale: Locale) {
  return import(`./lang/${locale}.json`).then((module) => module.default);
}
