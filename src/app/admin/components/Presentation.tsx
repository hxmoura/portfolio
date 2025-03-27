import { updatePath } from "@/app/actions";
import Input from "@/components/input";
import PrimaryButton from "@/components/primaryButton";
import Title from "@/components/title";
import database from "@/services/database";
import { Presentation as TypePresentation } from "@/types/presentation";
import { ChangeEvent, useEffect, useState } from "react";

export default function Presentation() {
  const [presentation, setPresentation] = useState<TypePresentation>({
    title: "",
    description: "",
    id: "",
  });

  useEffect(() => {
    const listener = database.listenDocumentUpdate(
      "presentation",
      "data",
      setPresentation
    );
    return () => listener();
  }, [presentation.id]);

  function handlePresentation(evt: ChangeEvent) {
    const { name, value } = evt.target as HTMLInputElement;

    setPresentation((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function sendPresentation() {
    database.updateDocument("presentation", presentation.id, presentation);
    updatePath("/");
  }

  return (
    <section className="flex flex-col gap-5">
      <Title noMargin>Editar apresentação</Title>
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
