"use client";

import BackButton from "@/components/backButton";
import Badge from "@/components/badge";
import Carousel from "@/components/carousel";
import Loading from "@/components/loading";
import PrimaryButton from "@/components/primaryButton";
import SecondaryButton from "@/components/secondaryButton";
import Setup from "@/components/setup";
import StaggedAnimation from "@/components/staggedAnimation";
import Status from "@/components/status";
import Title from "@/components/title";
import database from "@/services/database";
import { Project as TypeProject } from "@/types/project";
import {
  RiCodeSSlashLine,
  RiFigmaLine,
  RiSearchEyeLine,
} from "@remixicon/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Project() {
  const { slug } = useParams();
  const router = useRouter();

  const [project, setProject] = useState<TypeProject>({
    name: "",
    shortDescription: "",
    wallpaper: "",
    images: [],
    slug: "",
    status: "development",
    linkProject: "",
    linkCode: "",
    linkUI: "",
    description: "",
    features: "",
    technologies: "",
    id: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProject() {
      const [data] = await database.getByQuery("project", 1, {
        field: "slug",
        operator: "==",
        value: String(slug),
      });

      if (!data) {
        return router.push("/not-found");
      }

      setProject(data as TypeProject);
      setIsLoading(false);
    }

    getProject();
  }, [slug, router]);

  const imgsWithoutWallpaper = project.images.filter(
    (img) => img !== project.wallpaper
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Setup spaceElements={40}>
      <StaggedAnimation />
      <section>
        <BackButton redirect="/" />
        <div className="flex items-start gap-2 mt-1">
          <Title>{project.name}</Title>
          <Status status={project.status} />
        </div>

        <div className="flex flex-wrap gap-3">
          {project.linkProject && (
            <PrimaryButton onClick={project.linkProject} openInNewTab>
              <RiSearchEyeLine size={16} />
              <span className="text-sm">Visualizar</span>
            </PrimaryButton>
          )}
          {project.linkCode && (
            <SecondaryButton onClick={project.linkCode} openInNewTab>
              <RiCodeSSlashLine size={16} />
              <span className="text-sm">Código</span>
            </SecondaryButton>
          )}
          {project.linkUI && (
            <SecondaryButton onClick={project.linkUI} openInNewTab>
              <RiFigmaLine size={16} />
              <span className="text-sm">UI Design</span>
            </SecondaryButton>
          )}
        </div>
      </section>

      <p className="animation-blur">{project.description}</p>

      <Carousel images={imgsWithoutWallpaper} />

      {project.features && (
        <section>
          <Title>Funcionalidades 💡</Title>
          <ul className="list-disc list-inside">
            {project.features.split("\n").map((feature, index) => (
              <li className="animation-blur break-all" key={index}>
                {feature}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.technologies && (
        <section>
          <Title>Tecnologias usadas ⚙️</Title>
          <div className="flex flex-wrap gap-3">
            {project.technologies.split(",").map((tech, index) => (
              <Badge key={index}>{tech}</Badge>
            ))}
          </div>
        </section>
      )}
    </Setup>
  );
}
