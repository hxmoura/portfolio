import casamoura from "@/assets/images/casamoura.png";
import localize from "@/assets/images/localize.png";
import todolist from "@/assets/images/todolist.png";
import CardPost from "@/components/cardPost";
import Container from "@/components/container";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Project from "@/components/project";
import SectionTitle from "@/components/sectionTitle";
import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Header />
      <main className="flex flex-col flex-1 gap-20 my-20">
        <section>
          <h3 className="font-semibold text-xl mb-5">
            Olá, sou Henrique Moura 👋
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </section>
        <section>
          <SectionTitle>Experiência</SectionTitle>
          <div className="space-y-10">
            <Experience
              title="Fundador | GTA Modificado Brasil"
              date="2017-2022"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
            />
            <Experience
              title="Fundador | GTA Modificado Brasil"
              date="2017-2022"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
            />
          </div>
        </section>
        <section>
          <SectionTitle>Projetos</SectionTitle>
          <div className="flex flex-col gap-5">
            <Project
              title="Casa Moura"
              description="Ecommerce de materiais para construção"
              image={casamoura}
              redirectUrl="#"
            />
            <Project
              title="Todolist"
              description="Clássico gerenciador de tarefas e atividades diárias"
              image={todolist}
              redirectUrl="#"
            />
            <Project
              title="Localize"
              description="Busca de informações do CEP"
              image={localize}
              redirectUrl="#"
            />
          </div>
        </section>
        <section>
          <SectionTitle>Conteúdos</SectionTitle>

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
            className="flex items-center gap-1 mt-7 text-brand-500 dark:text-brand-300 group sm:hover:underline w-fit"
            href="#"
          >
            <span>Ver mais</span>
            <RiArrowRightLine
              size={16}
              className="sm:group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </Link>
        </section>
      </main>
      <Footer />
    </Container>
  );
}
