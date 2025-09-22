import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-5 animation-blur text-brand-500 dark:text-brand-300">
      <h4 className="font-signature text-2xl">Hxmoura</h4>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-5">
          <Link
            href="mailto:hxmoura@hotmail.com"
            className="text-sm underline hover:text-brand-700 hover:dark:text-white"
          >
            E-mail
          </Link>
          <Link
            href="https://www.linkedin.com/in/hxmoura/"
            target="_blank"
            className="text-sm underline hover:text-brand-700 hover:dark:text-white"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/hxmoura"
            target="_blank"
            className="text-sm underline hover:text-brand-700 hover:dark:text-white"
          >
            Github
          </Link>
        </div>
        <p className="text-sm text-brand-500 dark:text-brand-300 text-center">
          © hxmoura {new Date().getFullYear()} - Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
