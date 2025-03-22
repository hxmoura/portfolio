"use client";

import CardPost from "@/components/cardPost";
import Experience from "@/components/experience";
import Loading from "@/components/loading";
import Project from "@/components/project";
import Setup from "@/components/setup";
import StaggedAnimation from "@/components/staggedAnimation";
import Title from "@/components/title";
import database from "@/services/database";
import { Experience as TypeExperience } from "@/types/experience";
import { Presentation } from "@/types/presentation";
import { Project as TypeProject } from "@/types/project";
import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [presentation, setPresentation] = useState<Partial<Presentation>>({});
  const [projets, setProjects] = useState<TypeProject[]>([]);
  const [experiences, setExperiences] = useState<TypeExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const getPresentation = database.getDocument("presentation", "data");
      const getProjects = database.getCollection("project");
      const getExperiences = database.getCollection("experience");

      const [presentationData, projectsData, experiencesData] =
        (await Promise.all([getPresentation, getProjects, getExperiences])) as [
          Presentation,
          TypeProject[],
          TypeExperience[]
        ];

      setPresentation(presentationData);
      setProjects(projectsData);
      setExperiences(experiencesData);
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
                redirectUrl={`/${project.slug}`}
              />
            ))}
          </div>
        </section>
      )}
      <section>
        <Title>Conteúdos</Title>

        <div className="space-y-1">
          <CardPost
            redirectUrl="#"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            date="09/02/2025"
          />
          <CardPost
            redirectUrl="#"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            date="09/02/2025"
          />
          <CardPost
            redirectUrl="#"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            date="09/02/2025"
          />
          <CardPost
            redirectUrl="#"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            date="09/02/2025"
          />
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
    </Setup>
  );
}
