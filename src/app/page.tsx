import CardPost from "@/components/CardPost";
import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import Title from "@/components/Title";
import { Content as TypeContent } from "@/types/content";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { Icon } from "@iconify/react";
import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";

export default async function Home() {
  // const presentation = (await database.getDocument(
  //   "presentation",
  //   "data"
  // )) as TypePresentation;

  // const experiences = (await database.getByQuery("experience", [
  //   {
  //     field: "visible",
  //     operator: "==",
  //     value: true,
  //   },
  // ])) as TypeExp[];

  // const projects = (await database.getByQuery("project", [
  //   {
  //     field: "visible",
  //     operator: "==",
  //     value: true,
  //   },
  // ])) as TypeProject[];

  const contents = (await fetcher(
    `https://dev.to/api/articles?username=${process.env.NEXT_PUBLIC_DEV_TO_USERNAME}&per_page=5`,
    { next: { revalidate: 86400 } }
  )) as TypeContent[];

  return (
    <Setup spaceElements={80}>
      <StaggedAnimation />

      <section className="space-y-5">
        <p className="animation-blur text-brand-500 dark:text-brand-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum.
        </p>

        <Link
          href="/about"
          className="flex items-center gap-1 cursor-pointer group hover:underline w-fit animation-blur text-brand-700 dark:text-white"
        >
          Continuar lendo
          <Icon
            icon="ri:arrow-right-line"
            fontSize={16}
            className="sm:group-hover:translate-x-1.5 transition-transform duration-300"
          />
        </Link>

        <div className="flex items-center gap-2 text-brand-300 dark:text-brand-500 animation-blur">
          <span title="Nextjs">
            <Icon
              icon="ri:nextjs-fill"
              fontSize={32}
              className="hover:text-brand-500 hover:dark:text-white"
            />
          </span>
          <span title="Javascript">
            <Icon
              icon="ri:javascript-fill"
              fontSize={32}
              className="hover:text-brand-500 hover:dark:text-white"
            />
          </span>
          <span title="Figma">
            <Icon
              icon="ri:figma-fill"
              fontSize={32}
              className="hover:text-brand-500 hover:dark:text-white"
            />
          </span>
          <span title="Reactjs">
            <Icon
              icon="ri:reactjs-fill"
              fontSize={32}
              className="hover:text-brand-500 hover:dark:text-white"
            />
          </span>
          <span title="Nodejs">
            <Icon
              icon="ri:nodejs-fill"
              fontSize={32}
              className="hover:text-brand-500 hover:dark:text-white"
            />
          </span>
          <span title="TailwindCSS">
            <Icon
              icon="ri:tailwind-css-fill"
              fontSize={32}
              className="hover:text-brand-500 hover:dark:text-white"
            />
          </span>
          <p className="font-semibold">+12</p>
        </div>
      </section>

      {/* {experiences.length > 0 && (
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
          <Title>PROJETOS</Title>
          <div className="flex flex-col gap-1">
            {projects.map((project) => (
              <Project
                key={project.id}
                title={project.name}
                description={project.shortDescription}
                redirectUrl={`/project/${project.slug}`}
              />
            ))}
          </div>
        </section>
      )} */}

      {contents.length > 0 && (
        <section>
          <Title>CONTEÚDOS</Title>

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
