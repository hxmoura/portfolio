import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";

type Props = {
  fileName: string;
  folderPath: string;
};

export default function readMarkdown<T extends object>({
  folderPath,
  fileName,
}: Props) {
  const filePath = path.resolve(
    process.cwd(),
    "content",
    folderPath,
    `${fileName}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { content, data } = matter(fileContent);
  const typedData = data as T;

  const visibility = data.visibility ?? true;

  if (!visibility) {
    notFound();
  }

  return { content, data: typedData };
}
