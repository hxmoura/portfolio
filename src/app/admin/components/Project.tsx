import Input from "@/components/input";
import Modal from "@/components/modal";
import PrimaryButton from "@/components/primaryButton";
import SecondaryButton from "@/components/secondaryButton";
import Title from "@/components/title";
import database from "@/services/database";
import { RiDeleteBinLine, RiHeartFill } from "@remixicon/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

enum ProjectStatus {
  "development" = "development",
  "concluded" = "concluded",
}

interface Project {
  name: string;
  shortDescription: string;
  wallpaper: string;
  images: string[];
  slug: string;
  status: ProjectStatus;
  linkProject: string;
  linkCode: string;
  linkUI: string;
  description: string;
  features: string;
  technologies: string;
  id: string;
}

export default function Project() {
  const initialProject = {
    name: "",
    shortDescription: "",
    wallpaper: "",
    images: [],
    slug: "",
    status: ProjectStatus.development,
    linkProject: "",
    linkCode: "",
    linkUI: "",
    description: "",
    features: "",
    technologies: "",
    id: "",
  };
  const [projects, setProjects] = useState<Project[]>([]);
  const [modal, setModal] = useState(false);
  const [fields, setFields] = useState<Project>(initialProject);

  useEffect(() => {
    const listener = database.listenColletionUpdate("project", setProjects);
    return () => listener();
  }, []);

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
    database.deleteDocument("project", fields.id);
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

  async function addImage(evt: ChangeEvent<HTMLInputElement>) {
    const { files } = evt.target;

    if (files) {
      const form = new FormData();
      form.append("image", files[0]);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      const data = await response.json();

      if (data) {
        setFields((prev) => ({
          ...prev,
          images: [...prev.images, data.url],
        }));
      }
    }
  }

  function deleteImage(deleteUrl: string) {
    setFields((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image !== deleteUrl),
    }));
  }

  function selectWallpaper(image: string) {
    setFields((prev) => ({
      ...prev,
      wallpaper: image,
    }));
  }

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
            multiline
          />

          <Input
            value={fields.features}
            onChange={handleField}
            name="features"
            label="Recursos"
            multiline
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

          <input
            type="file"
            onChange={addImage}
            className="file:bg-brand-700 file:text-white dark:file:bg-white dark:file:text-brand-700 file:rounded-lg file:py-2 file:px-3 file:cursor-pointer"
          />
          <div className="flex gap-2">
            {fields.images &&
              fields.images.map((image, index) => (
                <div key={index} className="relative w-28 h-16">
                  <Image
                    src={image}
                    fill
                    className="object-cover rounded-lg"
                    alt=""
                    onClick={() => selectWallpaper(image)}
                  />
                  <button
                    className="bg-red-500 rounded-full h-6 w-6 flex items-center justify-center text-white absolute top-0 right-0"
                    onClick={() => deleteImage(image)}
                  >
                    <RiDeleteBinLine size={16} />
                  </button>
                  <RiHeartFill
                    size={24}
                    className={`text-green-300 absolute bottom-0 left-0 ${
                      image === fields.wallpaper ? "block" : "hidden"
                    }`}
                  />
                </div>
              ))}
          </div>

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
            <ul>
              {project.features.split("\n").map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
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
