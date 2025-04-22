import { updatePath } from "@/app/actions";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import PrimaryButton from "@/components/PrimaryButton";
import Project from "@/components/Project";
import SecondaryButton from "@/components/SecondaryButton";
import Title from "@/components/Title";
import database from "@/services/database";
import { Project as TypeProject } from "@/types/project";
import { fetcher } from "@/utils/fetcher";
import { RiDeleteBinLine, RiHeartFill } from "@remixicon/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import validateUser from "../validate";

export default function ProjectAdmin() {
  const initialProject: TypeProject = {
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
    visible: false,
    id: "",
  };
  const [projects, setProjects] = useState<TypeProject[]>([]);
  const [modal, setModal] = useState(false);
  const [fields, setFields] = useState<TypeProject>(initialProject);

  useEffect(() => {
    const listener = database.listenColletionUpdate("project", setProjects);
    return () => listener();
  }, []);

  function selectProject(project: TypeProject) {
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

  function toggleVisible() {
    setFields((prev) => ({
      ...prev,
      visible: !prev.visible,
    }));
  }

  async function deleteProject() {
    const isValidate = await validateUser();

    if (isValidate) {
      await database.deleteDocument("project", fields.id);
      setModal(false);
      updatePath("/");
    }
  }

  async function addOrUpdateProject() {
    const isValidate = await validateUser();

    if (isValidate) {
      if (fields.id) {
        await database.updateDocument("project", fields.id, fields);
      } else {
        await database.createDocument("project", fields);
      }

      setModal(false);
      updatePath("/");
    }
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

      const data = await fetcher("/api/upload", {
        method: "POST",
        body: form,
      });

      if (data) {
        setFields((prev) => ({
          ...prev,
          wallpaper: prev.images.length === 0 ? data.url : prev.wallpaper,
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
                checked={fields.status === "concluded"}
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
                checked={fields.status === "development"}
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
            <label>
              <input
                type="checkbox"
                name="visible"
                checked={fields.visible}
                onChange={toggleVisible}
              />
              Deixar visível?
            </label>
          </div>
        </Modal>
      )}
      <div className="flex justify-between items-center mb-7">
        <Title noMargin>Editar projetos</Title>
        <PrimaryButton onClick={newProject}>Novo projeto</PrimaryButton>
      </div>
      <div className="flex flex-col gap-3">
        {projects.reverse().map((project, index) => (
          <Project
            key={index}
            title={project.name}
            description={project.shortDescription}
            image={project.wallpaper}
            redirectUrl={project.linkProject}
            onClick={() => selectProject(project)}
          />
        ))}
      </div>
    </section>
  );
}
