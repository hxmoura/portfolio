import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";

// async function getProject(slug: string) {
//   const [project] = (await database.getByQuery(
//     "project",
//     [
//       {
//         field: "slug",
//         operator: "==",
//         value: slug,
//       },
//       {
//         field: "visible",
//         operator: "==",
//         value: true,
//       },
//     ],
//     1
//   )) as TypeProject[];

//   return project;
// }

// export async function generateMetadata({ params }: ProjectProps) {
//   const { slug } = await params;
//   const project = await getProject(slug);

//   return {
//     title: project.name,
//     description: project.shortDescription,
//   };
// }

export default async function Project() {
  // const project = await getProject(slug);
  // const project = null;

  // if (!project) {
  //   return redirect("/not-found");
  // }

  // const imgsWithoutWallpaper = project.images.filter(
  //   (img) => img !== project.wallpaper
  // );

  // const hasLink = project.linkCode || project.linkProject || project.linkUI;

  return (
    <Setup spaceElements={40}>
      <StaggedAnimation />
      {/* <section>
        <BackButton redirect="/" />
        <div className="flex items-start gap-2 mt-1">
          <Title noMargin>{project.name}</Title>
          <Status status={project.status} />
        </div>

        {hasLink && (
          <div className="flex flex-wrap gap-3 mt-7">
            {project.linkProject && (
              <PrimaryButton
                onClick={project.linkProject}
                openInNewTab
                analyticsClick={{
                  event: "project_actions_clicked",
                  target: project.linkProject,
                }}
              >
                <RiSearchEyeLine size={16} />
                <span className="text-sm">Visualizar</span>
              </PrimaryButton>
            )}
            {project.linkCode && (
              <SecondaryButton
                onClick={project.linkCode}
                openInNewTab
                analyticsClick={{
                  event: "project_actions_clicked",
                  target: project.linkCode,
                }}
              >
                <RiCodeSSlashLine size={16} />
                <span className="text-sm">Código</span>
              </SecondaryButton>
            )}
            {project.linkUI && (
              <SecondaryButton
                onClick={project.linkUI}
                openInNewTab
                analyticsClick={{
                  event: "project_actions_clicked",
                  target: project.linkUI,
                }}
              >
                <RiFigmaLine size={16} />
                <span className="text-sm">UI Design</span>
              </SecondaryButton>
            )}
          </div>
        )}
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
      )} */}
    </Setup>
  );
}
