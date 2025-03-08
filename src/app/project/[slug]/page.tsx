import BackButton from "@/components/backButton";
import Badge from "@/components/badge";
import Carousel from "@/components/carousel";
import PrimaryButton from "@/components/primaryButton";
import SecondaryButton from "@/components/secondaryButton";
import Setup from "@/components/setup";
import StaggedAnimation from "@/components/staggedAnimation";
import Status from "@/components/status";
import Title from "@/components/title";
import {
  RiCodeSSlashLine,
  RiFigmaLine,
  RiSearchEyeLine,
} from "@remixicon/react";

export default function Project() {
  return (
    <Setup spaceElements={40}>
      <StaggedAnimation />
      <section>
        <BackButton redirect="/" />
        <div className="flex items-start gap-2 mt-1">
          <Title>Casa Moura</Title>
          <Status status="concluded" />
        </div>

        <div className="flex flex-wrap gap-3">
          <PrimaryButton onClick="/" openInNewTab>
            <RiSearchEyeLine size={16} />
            <span className="text-sm">Visualizar</span>
          </PrimaryButton>
          <SecondaryButton onClick="/" openInNewTab>
            <RiCodeSSlashLine size={16} />
            <span className="text-sm">Código</span>
          </SecondaryButton>
          <SecondaryButton onClick="/" openInNewTab>
            <RiFigmaLine size={16} />
            <span className="text-sm">UI Design</span>
          </SecondaryButton>
        </div>
      </section>

      <p className="animation-blur">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </p>

      <Carousel
        images={[
          "https://images.unsplash.com/photo-1731450626260-0ca05713fdd7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1740165886202-924690cf11e4?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1740165886179-c2be3d6447ca?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1738924349706-14d70715e236?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1740767582687-96244e238c81?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1562749536-5642fe7bb115?q=80&w=1672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1599619800634-52718b7f9064?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1606523080746-c6a924e7ec8c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ]}
      />

      <section>
        <Title>Funcionalidades 💡</Title>
        <ul className="list-disc list-inside">
          <li className="animation-blur">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </li>
          <li className="animation-blur">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </li>
          <li className="animation-blur">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </li>
          <li className="animation-blur">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </li>
        </ul>
      </section>

      <section>
        <Title>Tecnologias usadas ⚙️</Title>
        <div className="flex flex-wrap gap-3">
          <Badge>React</Badge>
          <Badge>TailwindCSS</Badge>
          <Badge>TypeScript</Badge>
          <Badge>Firebase</Badge>
        </div>
      </section>
    </Setup>
  );
}
