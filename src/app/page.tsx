"use client";

import CardPost from "@/components/cardPost";
import Experience from "@/components/experience";
import Loading from "@/components/loading";
import Project from "@/components/project";
import Setup from "@/components/setup";
import StaggedAnimation from "@/components/staggedAnimation";
import Title from "@/components/title";
import database from "@/services/database";
import { Content } from "@/types/content";
import { Experience as TypeExperience } from "@/types/experience";
import { Presentation } from "@/types/presentation";
import { Project as TypeProject } from "@/types/project";
import { formatDate } from "@/utils/formatDate";
import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [presentation, setPresentation] = useState<Partial<Presentation>>({});
  const [experiences, setExperiences] = useState<TypeExperience[]>([]);
  const [projets, setProjects] = useState<TypeProject[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const getPresentation = database.getDocument("presentation", "data");
      const getProjects = database.getCollection("project");
      const getExperiences = database.getCollection("experience");
      const resp = await fetch(
        `https://dev.to/api/articles?username=${process.env.NEXT_PUBLIC_DEV_TO_USERNAME}&per_page=5`
      );
      const getContents = await resp.json();

      const [presentationData, projectsData, experiencesData, contentsData] =
        (await Promise.all([
          getPresentation,
          getProjects,
          getExperiences,
          getContents,
        ])) as [Presentation, TypeProject[], TypeExperience[], Content[]];

      const filtered = contentsData.map((content: Content) => ({
        title: content.title,
        published_at: formatDate(content.published_at),
        url: content.url,
      }));

      setPresentation(presentationData);
      setProjects(projectsData);
      setExperiences(experiencesData);
      setContents(filtered);
      setLoading(false);
    }

    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

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
      {projets.length > 0 && (
        <section>
          <Title>Projetos</Title>
          <div className="flex flex-col gap-5">
            {projets.map((project) => (
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
                date={content.published_at}
              />
            ))}
          </div>
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
        </section>
      )}
    </Setup>
  );
}
