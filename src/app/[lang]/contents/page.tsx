import Button from "@/components/Button";
import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import Title from "@/components/Title";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/dictionaries/config";
import { Content } from "@/types/content";
import { formatDate } from "@/utils/formatDate";
import getFrontmatter from "@/utils/getFrontmatter";
import { Icon } from "@iconify/react";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: lang === "en" ? "Articles" : "Conteúdos",
  };
}

type Props = {
  params: Promise<{ lang: Locale }>;
};

export default async function Contents({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const posts = getFrontmatter<Content>({ folderPath: `${lang}/posts` });

  return (
    <Setup dict={dict} lang={lang}>
      <StaggedAnimation />
      <Button href="/" arrowLeft className="text-sm">
        {dict.back}
      </Button>
      <Title>{dict.contentTitle}</Title>
      <ul>
        {posts.map((content, index) => (
          <li
            key={index}
            className="border-b border-brand-500 dark:border-brand-300 border-dashed last:border-none animation-blur"
          >
            <Link
              href={`/${lang}/contents/${content.slug}`}
              className="flex items-center justify-between py-4 text-brand-500 sm:hover:text-brand-700 dark:text-brand-300 sm:dark:hover:text-white transition-colors duration-300"
            >
              <p>{content.title}</p>
              <div className="flex items-center gap-3 ml-5">
                <small className="text-sm hidden sm:block">
                  {formatDate(content.date, lang)}
                </small>
                <Icon icon="ri:link" width={16} height={16} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Setup>
  );
}
