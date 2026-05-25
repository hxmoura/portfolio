import fs from "fs";
import path from "path";

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const enDir = path.join("content", "en");

async function translateText(text: string) {
  if (!DEEPL_API_KEY) {
    throw new Error("DEEPL_API_KEY is not defined in environment variables");
  }

  const apiUrl = "https://api-free.deepl.com/v2/translate"

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      auth_key: DEEPL_API_KEY,
      text,
      source_lang: "PT",
      target_lang: "EN",
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`DeepL API returned status ${res.status}: ${errorText}`);
  }

  const data = await res.json();

  return data.translations?.[0]?.text;
}

async function translateFile(file: string) {
  const relativePath = path.relative(path.join("content", "pt"), file);
  const targetPath = path.join(enDir, relativePath);

  const text = fs.readFileSync(file, "utf8");

  try {
  const translated = await translateText(text);

  if (!translated) {
      console.error(`Could not translate file ${file}: DeepL returned an empty translation`);
    return;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, translated, "utf8");
    console.log(`Successfully translated: ${file} -> ${targetPath}`);
  } catch (error: unknown) {
    console.error(`Error translating file ${file}:`, (error as Error).message || error);
}
}

const files = process.argv.slice(2);

if (!files.length) {
  console.error("No file specified");
  process.exit(0);
}

for (const file of files) {
  if (file.endsWith(".mdx")) {
    await translateFile(file);
  }
}

