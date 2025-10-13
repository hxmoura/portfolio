import Button from "@/components/Button";
import CustomLink from "@/components/CustomLink";
import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import Technology from "@/components/Technology";
import Title from "@/components/Title";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/dictionaries/config";
import { Project } from "@/types/project";
import { components } from "@/utils/components";
import readMarkdown from "@/utils/readMarkdown";
import { Icon } from "@iconify/react";
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
    <Setup spaceElements={96} dict={dict} lang={lang}>
      <StaggedAnimation />

      <div className="mb-5">
        <div className="space-y-1">
          <CustomLink href="/" arrow="left" className="text-sm">
            {dict.back}
          </CustomLink>

          <Title noMargin>{data.name}</Title>

          <p className="text-sm animation-blur">
            {data.status === "done" ? dict.done : dict.development}
          </p>
        </div>

        <div className="flex gap-5 mt-6 mb-12">
          {data.projectUrl && (
            <Button openInNewTab href={data.projectUrl} type="primary">
              <Icon icon="ri:search-eye-line" width={16} height={16} />
              {dict.seeProject}
            </Button>
          )}
          {data.codeUrl && (
            <Button
              openInNewTab
              href={data.codeUrl}
              type={data.projectUrl ? "secondary" : "primary"}
            >
              <Icon icon="ri:code-s-slash-fill" width={16} height={16} />
              {dict.code}
            </Button>
          )}
        </div>

        <p className="animation-blur">{data.description}</p>

        <div className="flex flex-wrap gap-3 mt-7">
          {data.stacks?.map((tech) => (
            <Technology key={tech} name={tech} />
          ))}
        </div>
      </div>

      <MDXRemote source={content} components={components} />
    </Setup>
  );
}
