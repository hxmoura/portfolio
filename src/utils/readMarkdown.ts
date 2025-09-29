import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";

export default function readMarkdown(slug: string, directory: string) {
  const filesDirectory = path.join(process.cwd(), directory);
  const filePath = path.join(filesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, "utf-8");

  return content;
}
