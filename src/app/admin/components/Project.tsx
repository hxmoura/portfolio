import Input from "@/components/input";
import Modal from "@/components/modal";
import PrimaryButton from "@/components/primaryButton";
import SecondaryButton from "@/components/secondaryButton";
import Title from "@/components/title";
import database from "@/services/database";
import { RiDeleteBinLine } from "@remixicon/react";
import { ChangeEvent, useEffect, useState } from "react";

enum ProjectStatus {
  "development" = "development",
  "concluded" = "concluded",
}

interface Project {
  name: string;
  shortDescription: string;
  slug: string;
  status: ProjectStatus;
  linkProject: string;
  linkCode: string;
  linkUI: string;
  description: string;
  features: string;
  technologies: string;
  id: string | null;
}

export default function Project() {
  const initialProject = {
    name: "",
    shortDescription: "",
    slug: "",
    status: ProjectStatus.development,
    linkProject: "",
    linkCode: "",
    linkUI: "",
    description: "",
    features: "",
    technologies: "",
    id: null,
  };
  const [projects, setProjects] = useState<Project[]>([]);
  const [modal, setModal] = useState(false);
  const [fields, setFields] = useState<Project>(initialProject);

  function selectProject(project: Project) {
    setFields(project);
    setModal(true);
  }

  function handleField(evt: ChangeEvent) {
    const { name, value } = evt.target as HTMLInputElement;

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function deleteProject() {
    database.deleteDocument("project", fields.id!);
    setModal(false);
  }

  function addOrUpdateProject() {
    if (fields.id) {
      database.updateDocument("project", fields.id, fields);
    } else {
      database.createDocument("project", fields);
    }

    setModal(false);
  }

  function newProject() {
    setFields(initialProject);
    setModal(true);
  }

  useEffect(() => {
    const listener = database.listenColletionUpdate("project", setProjects);
    return () => listener();
  }, []);

  return (
    <section className="flex flex-col gap-3.5">
      {modal && (
        <Modal>
          <div className="flex w-full gap-2">
            <Input
              value={fields.name}
              onChange={handleField}
              name="name"
              label="Nome"
            />
            <Input
              value={fields.shortDescription}
              onChange={handleField}
              name="shortDescription"
              label="Descrição curta"
            />
          </div>
          <div className="flex w-full gap-2">
            <Input
              value={fields.slug}
              onChange={handleField}
              name="slug"
              label="Slug"
            />
            <Input
              value={fields.linkCode}
              onChange={handleField}
              name="linkCode"
              label="Link do código"
            />
          </div>
          <div className="flex w-full gap-2">
            <Input
              value={fields.linkProject}
              onChange={handleField}
              name="linkProject"
              label="Link do projeto"
            />
            <Input
              value={fields.linkUI}
              onChange={handleField}
              name="linkUI"
              label="Link do design"
            />
          </div>
          <Input
            value={fields.description}
            onChange={handleField}
            name="description"
            label="Descrição"
          />
          <Input
            value={fields.features}
            onChange={handleField}
            name="features"
            label="Recursos"
          />
          <Input
            value={fields.technologies}
            onChange={handleField}
            name="technologies"
            label="Tecnologias"
          />
          <fieldset>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="concluded"
                name="status"
                value="concluded"
                checked={fields.status === ProjectStatus.concluded}
                onChange={handleField}
              />
              <label htmlFor="concluded">Concluido</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="development"
                name="status"
                value="development"
                checked={fields.status === ProjectStatus.development}
                onChange={handleField}
              />
              <label htmlFor="development">Desenvolvimento</label>
            </div>
          </fieldset>

          <div className="flex gap-2">
            <PrimaryButton onClick={addOrUpdateProject}>
              Confirmar alterações
            </PrimaryButton>
            <SecondaryButton onClick={() => setModal(false)}>
              Cancelar
            </SecondaryButton>
            {fields.id && (
              <SecondaryButton onClick={deleteProject}>
                <RiDeleteBinLine size={24} />
              </SecondaryButton>
            )}
          </div>
        </Modal>
      )}
      <div className="flex justify-between items-center">
        <Title noMargin>Editar projetos</Title>
        <PrimaryButton onClick={newProject}>Novo projeto</PrimaryButton>
      </div>
      <div className="flex flex-col gap-3">
        {projects.reverse().map((project, index) => (
          <button
            key={index}
            className="p-6 rounded-lg bg-brand-50 dark:bg-brand-700 flex flex-col cursor-pointer"
            onClick={() => selectProject(project)}
          >
            <span>
              <strong>Nome: </strong>
              {project.name}
            </span>
            <span>
              <strong>Descrição: </strong>
              {project.shortDescription}
            </span>
            <span>
              <strong>features: </strong>
              {project.features}
            </span>
            <span>
              <strong>linkCode: </strong>
              {project.linkCode}
            </span>
            <span>
              <strong>linkProject: </strong>
              {project.linkProject}
            </span>
            <span>
              <strong>linkUI: </strong>
              {project.linkUI}
            </span>
            <span>
              <strong>Status: </strong>
              {project.status}
            </span>
            <span>
              <strong>technologies: </strong>
              {project.technologies}
            </span>
            <span>
              <strong>slug: </strong>
              {project.slug}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
