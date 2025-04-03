import BackButton from "@/components/BackButton";
import Badge from "@/components/Badge";
import Carousel from "@/components/Carousel";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import Status from "@/components/Status";
import Title from "@/components/Title";
import database from "@/services/database";
import { Project as TypeProject } from "@/types/project";
import {
  RiCodeSSlashLine,
  RiFigmaLine,
  RiSearchEyeLine,
} from "@remixicon/react";
import { redirect } from "next/navigation";

type ProjectProps = {
  params: Promise<{ slug: string }>;
};

async function getProject(slug: string) {
  const [project] = (await database.getByQuery("project", 1, {
    field: "slug",
    operator: "==",
    value: String(slug),
  })) as TypeProject[];

  return project;
}

export async function generateMetadata({ params }: ProjectProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  return {
    title: project.name,
    description: project.shortDescription,
  };
}

export default async function Project({ params }: ProjectProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return redirect("/not-found");
  }

  const imgsWithoutWallpaper = project.images.filter(
    (img) => img !== project.wallpaper
  );

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

      {imgsWithoutWallpaper.length > 0 && (
        <Carousel images={imgsWithoutWallpaper} />
      )}

      {project.features && (
        <section>
          <Title>Funcionalidades 💡</Title>
          <ul className="list-disc list-inside">
            {project.features.split("\n").map((feature, index) => (
              <li
                className="animation-blur whitespace-break-spaces"
                key={index}
              >
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
