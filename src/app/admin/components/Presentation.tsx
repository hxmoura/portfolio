import Input from "@/components/Input";
import PrimaryButton from "@/components/primaryButton";
import Title from "@/components/title";
import database from "@/services/database";
import { ChangeEvent, useEffect, useState } from "react";

interface Presentation {
  title: string;
  description: string;
  id: string | null;
}

export default function Presentation() {
  const [presentation, setPresentation] = useState<Presentation>({
    title: "",
    description: "",
    id: null,
  });

  function handlePresentation(evt: ChangeEvent) {
    const { name, value } = evt.target as HTMLInputElement;

    setPresentation((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function sendPresentation() {
    await database.updateDocument(
      "presentation",
      presentation.id!,
      presentation
    );
  }

  useEffect(() => {
    async function get() {
      const data = (await database.getCollection(
        "presentation"
      )) as Presentation[];
      setPresentation(data[0]);
    }

    get();
  }, []);

  return (
    <section className="flex flex-col gap-3.5">
      <Title>Editar apresentação</Title>
      <Input
        value={presentation.title}
        onChange={handlePresentation}
        name="title"
        label="Título"
      />
      <Input
        value={presentation.description}
        onChange={handlePresentation}
        name="description"
        label="Descrição"
      />
      <PrimaryButton onClick={sendPresentation}>
        Salvar alterações
      </PrimaryButton>
    </section>
  );
}
