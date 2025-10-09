import fs from "fs";
import matter from "gray-matter";
import path from "path";

type Props = {
  folderPath: string;
  limit?: number;
};

type FrontmatterBase = { slug: string };

export default function getFrontmatter<T>({
  folderPath,
  limit = 999,
}: Props): Array<FrontmatterBase & T> {
  const dir = path.join(process.cwd(), "content", folderPath);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);

  const allData = files.map((file) => {
    const filePath = path.join(dir, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);

    return {
      slug: file.replace(/\.mdx?$/, ""),
      visibility: data.visibility ?? true,
      ...(data as T),
    };
  });

  return allData
    .filter((data) => data.visibility)
    .sort((a, b) => {
      const dateA =
        "publishedAt" in a ? new Date(a.publishedAt as string).getTime() : 0;
      const dateB =
        "publishedAt" in b ? new Date(b.publishedAt as string).getTime() : 0;
      return dateA - dateB;
    })
    .slice(0, limit);
}
