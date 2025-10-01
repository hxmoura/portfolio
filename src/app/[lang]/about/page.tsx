import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/dictionaries/config";
import { components } from "@/utils/components";
import readMarkdown from "@/utils/readMarkdown";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote-client/rsc";

type Props = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: lang === "en" ? "About" : "Sobre",
  };
}

export default async function About({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const { content } = readMarkdown({
    folderPath: `${lang}/about`,
    fileName: "about",
  });

  return (
    <Setup spaceElements={40} dict={dict} lang={lang}>
      <StaggedAnimation />

      <MDXRemote source={content} components={components} />
    </Setup>
  );
}
