import BackButton from "@/components/backButton";
import Setup from "@/components/setup";
import StaggedAnimation from "@/components/staggedAnimation";
import Title from "@/components/title";
import { Content } from "@/types/content";
import { formatDate } from "@/utils/formatDate";
import { RiLink } from "@remixicon/react";
import Link from "next/link";

export default async function Contents() {
  const resp = await fetch(
    `https://dev.to/api/articles?username=${process.env.NEXT_PUBLIC_DEV_TO_USERNAME}`
  );
  const data = await resp.json();

  const contents = data.map((content: Content) => ({
    title: content.title,
    published_at: formatDate(content.published_at),
    url: content.url,
  }));

  return (
    <Setup>
      <StaggedAnimation />
      <BackButton redirect="/" />
      <Title>Conteúdos</Title>
      <ul>
        {contents.map((content: Content, index: number) => (
          <li
            key={index}
            className="border-b border-brand-500 dark:border-brand-300 border-dashed last:border-none animation-blur"
          >
            <Link
              href={content.url}
              target="_blank"
              className="flex items-center justify-between py-4 text-brand-500 sm:hover:text-brand-700 dark:text-brand-300 sm:dark:hover:text-white transition-colors duration-300"
            >
              <p>{content.title}</p>
              <div className="flex items-center gap-3 ml-5">
                <small className="text-sm hidden sm:block">
                  {content.published_at}
                </small>
                <RiLink size={16} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Setup>
  );
}
