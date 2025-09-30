import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/dictionaries/config";
import { components } from "@/utils/components";
import readMarkdown from "@/utils/readMarkdown";
import { MDXRemote } from "next-mdx-remote-client/rsc";

type ContentsProps = {
  params: Promise<{ slug: string; lang: Locale }>;
};

export default async function ContentsPage({ params }: ContentsProps) {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);

  const content = readMarkdown(slug, `content/${lang}/posts`);

  return (
    <Setup spaceElements={40} dict={dict} lang={lang}>
      <StaggedAnimation />

      <MDXRemote source={content} components={components} />
    </Setup>
  );
}
