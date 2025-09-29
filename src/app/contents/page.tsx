import BackButton from "@/components/BackButton";
import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import Title from "@/components/Title";
import { Content } from "@/types/content";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { Icon } from "@iconify/react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conteúdos",
};

export default async function Contents() {
  const contents = await fetcher(
    `https://dev.to/api/articles?username=${process.env.NEXT_PUBLIC_DEV_TO_USERNAME}`,
    { next: { revalidate: 86400 } }
  );

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
                  {formatDate(content.published_at)}
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
