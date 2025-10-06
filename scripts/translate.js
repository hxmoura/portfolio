import fs from "fs";
import path from "path";

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const ptDir = path.join("content", "pt");
const enDir = path.join("content", "en");

async function translateText(text) {
  const res = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      auth_key: DEEPL_API_KEY,
      text,
      source_lang: "PT",
      target_lang: "EN",
    }),
  });

  const data = await res.json();
  return data.translations?.[0]?.text;
}

async function translateFile(file) {
  const sourcePath = path.join(ptDir, file);
  const targetPath = path.join(enDir, file);

  const text = fs.readFileSync(sourcePath, "utf8");
  const translated = await translateText(text);

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, translated, "utf8");

  console.log(`✅ Traduzido: ${file}`);
}

const files = process.argv.slice(2);
if (!files.length) {
  console.log("Nenhum arquivo especificado.");
  process.exit(0);
}

for (const file of files) {
  if (file.endsWith(".mdx")) {
    await translateFile(file);
  }
}
