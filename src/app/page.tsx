import CardPost from "@/components/CardPost";
import Experience from "@/components/Experience";
import Project from "@/components/Project";
import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import Title from "@/components/Title";
import database from "@/services/database";
import { Content as TypeContent } from "@/types/content";
import { Experience as TypeExp } from "@/types/experience";
import { Presentation as TypePresentation } from "@/types/presentation";
import { Project as TypeProject } from "@/types/project";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";

export default async function Home() {
  const presentation = (await database.getDocument(
    "presentation",
    "data"
  )) as TypePresentation;
  const experiences = (await database.getCollection("experience")) as TypeExp[];
  const projects = (await database.getCollection("project")) as TypeProject[];
  const contents = (await fetcher(
    `https://dev.to/api/articles?username=${process.env.NEXT_PUBLIC_DEV_TO_USERNAME}&per_page=5`,
    { next: { revalidate: 86400 } }
  )) as TypeContent[];

  return (
    <Setup spaceElements={80}>
      <StaggedAnimation />

      <section>
        <h3 className="font-semibold text-xl mb-5 animation-blur">
          {presentation.title}
        </h3>
        <p className="animation-blur">{presentation.description}</p>
      </section>

      {experiences.length > 0 && (
        <section>
          <Title>Experiência</Title>
          <div className="space-y-10">
            {experiences.map((exp) => (
              <Experience
                key={exp.id}
                title={exp.title}
                date={exp.date}
                description={exp.description}
              />
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <Title>Projetos</Title>
          <div className="flex flex-col gap-5">
            {projects.map((project) => (
              <Project
                key={project.id}
                title={project.name}
                description={project.shortDescription}
                image={project.wallpaper}
                redirectUrl={`/project/${project.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      {contents.length > 0 && (
        <section>
          <Title>Conteúdos</Title>

          <div className="space-y-1">
            {contents.map((content, index) => (
              <CardPost
                key={index}
                redirectUrl={content.url}
                title={content.title}
                date={formatDate(content.published_at)}
              />
            ))}
          </div>

          {contents.length >= 5 && (
            <Link
              className="flex items-center gap-1 mt-7 text-brand-500 dark:text-brand-300 group sm:hover:underline w-fit animation-blur"
              href="/contents"
            >
              <span>Ver mais</span>
              <RiArrowRightLine
                size={16}
                className="sm:group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </Link>
          )}
        </section>
      )}
    </Setup>
  );
}
