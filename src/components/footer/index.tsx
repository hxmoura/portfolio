import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2">
      <div className="flex gap-5 justify-center flex-wrap">
        <p className="text-sm text-brand-500">
          Tema: <button className="underline cursor-pointer">Sistema</button>
        </p>
        <p className="text-sm text-brand-500">
          Idioma:{" "}
          <button className="underline cursor-pointer">Português</button>
        </p>
        <button className="text-sm text-brand-500">
          <Link
            target="_blank"
            href="https://github.com/hxmoura/portfolio-v2"
            className="underline"
          >
            Código
          </Link>
        </button>
      </div>
      <p className="text-sm text-brand-500 text-center">
        © hxmoura {new Date().getFullYear()} - Todos os direitos reservados
      </p>
    </footer>
  );
}
