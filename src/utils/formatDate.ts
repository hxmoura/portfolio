export function formatDate(isoDate: string, lang = "pt") {
  if (!isoDate) return "";

  const [year, month, day] = isoDate.split("-");

  if (lang === "en") {
    return `${month}/${day}/${year}`;
  }

  return `${day}/${month}/${year}`;
}
