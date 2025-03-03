import BackButton from "@/components/backButton";
import Badge from "@/components/badge";
import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Status from "@/components/status";
import Title from "@/components/title";
import animationBlur from "@/utils/animationBlur";
import {
  RiCodeSSlashLine,
  RiFigmaLine,
  RiSearchEyeLine,
} from "@remixicon/react";
import Link from "next/link";

export default function Project() {
  return (
    <Container>
      <Header animationBlurLevel={1} />
      <main className="flex-1 my-20 space-y-10">
        <div>
          <BackButton redirect="/" animationBlurLevel={2} />
          <div className="flex items-start gap-2 mt-1">
            <Title animationBlurLevel={3}>Casa Moura</Title>
            <Status animationBlurLevel={4} status="concluded" />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="https://google.com"
              target="_blank"
              className={`
                flex gap-2 items-center px-3 py-2 rounded-lg bg-brand-700 text-white dark:bg-white dark:text-brand-700 h-10
                  ${animationBlur(5)}
              `}
            >
              <RiSearchEyeLine size={16} />
              <span className="text-sm">Visualizar</span>
            </Link>
            <Link
              href="https://google.com"
              target="_blank"
              className={`flex gap-2 items-center px-3 py-2 rounded-lg bg-brand-50 dark:bg-brand-700 h-10 ${animationBlur(
                6
              )}`}
            >
              <RiCodeSSlashLine size={16} />
              <span className="text-sm">Código</span>
            </Link>
            <Link
              href="https://google.com"
              target="_blank"
              className={`flex gap-2 items-center px-3 py-2 rounded-lg bg-brand-50 dark:bg-brand-700 h-10 ${animationBlur(
                7
              )}`}
            >
              <RiFigmaLine size={16} />
              <span className="text-sm">UI Design</span>
            </Link>
          </div>
        </div>
        <p className={`${animationBlur(8)}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>

        <div>
          <Title animationBlurLevel={10}>Funcionalidades 💡</Title>
          <ul className={`list-disc list-inside`}>
            <li className={`${animationBlur(11)}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </li>
            <li className={`${animationBlur(12)}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </li>
            <li className={`${animationBlur(13)}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </li>
            <li className={`${animationBlur(14)}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </li>
          </ul>
        </div>

        <div>
          <Title animationBlurLevel={15}>Tecnologias usadas ⚙️</Title>
          <div className="flex flex-wrap gap-3">
            <Badge animationBlurLevel={16}>React</Badge>
            <Badge animationBlurLevel={17}>TailwindCSS</Badge>
            <Badge animationBlurLevel={18}>TypeScript</Badge>
            <Badge animationBlurLevel={19}>Firebase</Badge>
          </div>
        </div>
      </main>
      <Footer animationBlurLevel={20} />
    </Container>
  );
}
