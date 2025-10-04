import Button from "@/components/Button";
import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/dictionaries/config";
import { Content } from "@/types/content";
import { components } from "@/utils/components";
import { formatDate } from "@/utils/formatDate";
import readMarkdown from "@/utils/readMarkdown";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote-client/rsc";

type Props = {
  params: Promise<{ slug: string; lang: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;

  const { data } = readMarkdown<Content>({
    folderPath: `${lang}/posts`,
    fileName: slug,
  });

  return {
    title: data.title,
  };
}

export default async function ContentsPage({ params }: Props) {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);

  const { content, data } = readMarkdown<Content>({
    folderPath: `${lang}/posts`,
    fileName: slug,
  });

  return (
    <Setup spaceElements={40} dict={dict} lang={lang}>
      <StaggedAnimation />

      <div className="space-y-1">
        <Button href="/contents" arrowLeft className="text-sm">
          {dict.back}
        </Button>

        <h1 className="font-semibold text-xl text-brand-700 dark:text-white animation-blur">
          {data.title}
        </h1>

        <p className="text-sm animation-blur">
          {dict.postedOn} {formatDate(data.publishedAt, lang)}
        </p>
      </div>

      <MDXRemote source={content} components={components} />
    </Setup>
  );
}
