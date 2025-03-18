import Input from "@/components/input";
import Modal from "@/components/modal";
import PrimaryButton from "@/components/primaryButton";
import SecondaryButton from "@/components/secondaryButton";
import Title from "@/components/title";
import database from "@/services/database";
import { RiDeleteBinLine } from "@remixicon/react";
import { ChangeEvent, useEffect, useState } from "react";

export interface Experience {
  title: string;
  description: string;
  date: string;
  id: string | null;
}

export default function Experience() {
  const initialFields = {
    title: "",
    description: "",
    date: "",
    id: null,
  };

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [modal, setModal] = useState(false);
  const [fields, setFields] = useState<Experience>(initialFields);

  useEffect(() => {
    const listener = database.listenColletionUpdate<Experience>(
      "experience",
      setExperiences
    );
    return () => listener();
  }, []);

  function selectExperience(exp: Experience) {
    setFields(exp);
    setModal(true);
  }

  function addOrUpdateExperience() {
    if (fields.id) {
      database.updateDocument("experience", fields.id, fields);
    } else {
      database.createDocument("experience", fields);
    }
    setModal(false);
  }

  function newExperience() {
    setFields(initialFields);
    setModal(true);
  }

  async function deleteExperience() {
    await database.deleteDocument("experience", fields.id!);
    setModal(false);
  }

  function handleField(evt: ChangeEvent) {
    const { name, value } = evt.target as HTMLInputElement;

    setFields((prev) => ({
      ...prev,
      [name]: value,
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
          </div>
        </Modal>
      )}
      <div className="flex justify-between items-center">
        <Title noMargin>Editar experiência</Title>
        <PrimaryButton onClick={newExperience}>Nova experiência</PrimaryButton>
      </div>
      <div className="flex flex-col gap-3">
        {experiences.reverse().map((exp, index) => (
          <button
            key={index}
            className="p-6 rounded-lg bg-brand-50 dark:bg-brand-700 flex flex-col cursor-pointer"
            onClick={() => selectExperience(exp)}
          >
            <span>
              <strong>Titulo: </strong>
              {exp.title}
            </span>
            <span>
              <strong>Descrição: </strong>
              {exp.description}
            </span>
            <span>
              <strong>Data: </strong>
              {exp.date}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
