import CustomLink from "./CustomLink";

type Props = {
  dict: Record<string, string>;
};

export default function Footer({ dict }: Props) {
  return (
    <footer className="flex flex-col items-center gap-5 animation-blur text-brand-500 dark:text-brand-300">
      <h4 className="font-signature text-2xl">Hxmoura</h4>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-5">
          <CustomLink href="mailto:hxmoura@hotmail.com" className="text-sm">
            E-mail
          </CustomLink>
          <CustomLink
            href="https://www.linkedin.com/in/hxmoura/"
            external
            className="text-sm"
          >
            LinkedIn
          </CustomLink>
          <CustomLink
            href="https://github.com/hxmoura"
            external
            className="text-sm"
          >
            Github
          </CustomLink>
        </div>
        <p className="text-sm text-brand-500 dark:text-brand-300 text-center">
          © hxmoura {new Date().getFullYear()} - {dict.copyright}
        </p>
      </div>
    </footer>
  );
}
