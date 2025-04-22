import { updatePath } from "@/app/actions";
import Experience from "@/components/Experience";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Title from "@/components/Title";
import database from "@/services/database";
import { Experience as TypeExperience } from "@/types/experience";
import { RiDeleteBinLine } from "@remixicon/react";
import { ChangeEvent, useEffect, useState } from "react";
import validateUser from "../validate";

export default function ExperienceAdmin() {
  const initialFields = {
    title: "",
    description: "",
    date: "",
    visible: false,
    id: "",
  };

  const [experiences, setExperiences] = useState<TypeExperience[]>([]);
  const [modal, setModal] = useState(false);
  const [fields, setFields] = useState<TypeExperience>(initialFields);

  useEffect(() => {
    const listener = database.listenColletionUpdate<TypeExperience>(
      "experience",
      setExperiences
    );
    return () => listener();
  }, []);

  function selectExperience(exp: TypeExperience) {
    setFields(exp);
    setModal(true);
  }

  async function addOrUpdateExperience() {
    const isValidate = await validateUser();

    if (isValidate) {
      if (fields.id) {
        database.updateDocument("experience", fields.id, fields);
      } else {
        database.createDocument("experience", fields);
      }

      setModal(false);
      updatePath("/");
    }
  }

  function newExperience() {
    setFields(initialFields);
    setModal(true);
  }

  async function deleteExperience() {
    const isValidate = await validateUser();

    if (isValidate) {
      await database.deleteDocument("experience", fields.id);
      setModal(false);
      updatePath("/");
    }
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

  return (
    <section className="flex flex-col gap-3.5">
      {modal && (
        <Modal>
          <Input
            value={fields.title}
            onChange={handleField}
            name="title"
            label="Titulo"
          />
          <Input
            value={fields.description}
            onChange={handleField}
            name="description"
            label="Descrição"
            multiline
          />
          <Input
            value={fields.date}
            onChange={handleField}
            name="date"
            label="Data"
          />
          <div className="flex gap-2">
            <PrimaryButton onClick={addOrUpdateExperience}>
              Confirmar alterações
            </PrimaryButton>
            <SecondaryButton onClick={() => setModal(false)}>
              Cancelar
            </SecondaryButton>
            {fields.id && (
              <SecondaryButton onClick={deleteExperience}>
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
        <Title noMargin>Editar experiência</Title>
        <PrimaryButton onClick={newExperience}>Nova experiência</PrimaryButton>
      </div>
      <div className="flex flex-col gap-3">
        {experiences.reverse().map((exp, index) => (
          <Experience
            key={index}
            title={exp.title}
            date={exp.date}
            description={exp.description}
            onClick={() => selectExperience(exp)}
          />
        ))}
      </div>
    </section>
  );
}
