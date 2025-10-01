import Button from "@/components/Button";
import CardPost from "@/components/CardPost";
import CardProject from "@/components/CardProject";
import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import Title from "@/components/Title";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/dictionaries/config";
import { AboutHome } from "@/types/aboutHome";
import { Content } from "@/types/content";
import { Project } from "@/types/project";
import { components } from "@/utils/components";
import { formatDate } from "@/utils/formatDate";
import getFrontmatter from "@/utils/getFrontmatter";
import readMarkdown from "@/utils/readMarkdown";
import { Icon } from "@iconify/react";
import { MDXRemote } from "next-mdx-remote-client/rsc";

type Props = {
  params: Promise<{ lang: Locale }>;
};

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const { content, data } = readMarkdown<AboutHome>({
    folderPath: `${lang}/about`,
    fileName: "aboutHome",
  });
  const projects = getFrontmatter<Project>({
    folderPath: `${lang}/projects`,
  });
  const posts = getFrontmatter<Content>({
    folderPath: `${lang}/posts`,
    limit: 5,
  });

  return (
    <Setup spaceElements={80} dict={dict} lang={lang}>
      <StaggedAnimation />

      <section className="space-y-5">
        <MDXRemote source={content} components={components} />

        {data.showContinueReadingButton && (
          <Button href="/about" className="text-brand-700 dark:text-white">
            {dict.readMore}
          </Button>
        )}

        <div className="flex items-center gap-2 text-brand-300 dark:text-brand-500 animation-blur">
          {data.stack.map((tech: string, index: number) => (
            <Icon
              key={index}
              icon={tech}
              fontSize={32}
              className="hover:text-brand-500 hover:dark:text-white"
            />
          ))}
          <p className="font-semibold">+12</p>
        </div>
      </section>

      {projects.length > 0 && (
        <section>
          <Title>{dict.projectTitle}</Title>
          <div className="flex flex-col gap-1">
            {projects.map((project) => (
              <CardProject
                key={project.slug}
                title={project.name}
                description={project.shortDescription}
                icon={project.icon}
                redirectUrl={`/${lang}/project/${project.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <Title>{dict.contentTitle}</Title>

          <div className="space-y-1">
            {posts.map((post, index) => (
              <CardPost
                key={index}
                redirectUrl={`/${lang}/contents/${post.slug}`}
                title={post.title}
                date={formatDate(post.date, lang)}
              />
            ))}
          </div>

          <Button href="/contents" className="mt-7">
            {dict.seeMore}
          </Button>
        </section>
      )}
    </Setup>
  );
}
