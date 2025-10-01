import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/dictionaries/config";
import { Project } from "@/types/project";
import { components } from "@/utils/components";
import readMarkdown from "@/utils/readMarkdown";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote-client/rsc";

type Props = {
  params: Promise<{ slug: string; lang: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;

  const { data } = readMarkdown<Project>({
    folderPath: `${lang}/projects`,
    fileName: slug,
  });

  return {
    title: data.name,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);

  const { content, data } = readMarkdown<Project>({
    folderPath: `${lang}/projects`,
    fileName: slug,
  });

  return (
    <Setup spaceElements={40} dict={dict} lang={lang}>
      <StaggedAnimation />

      <MDXRemote source={content} components={components} />
    </Setup>
  );
}
