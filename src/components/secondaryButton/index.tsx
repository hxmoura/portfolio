import Link from "next/link";

type SecondaryButton = {
  children: React.ReactNode;
  onClick: VoidFunction | string;
  openInNewTab?: boolean;
};

export default function SecondaryButton({
  children,
  onClick,
  openInNewTab,
}: SecondaryButton) {
  return (
    <>
      {typeof onClick === "string" ? (
        <Link
          href={onClick}
          target={openInNewTab ? "_blank" : "_self"}
          className="rounded-lg py-2 px-3 bg-brand-50 dark:bg-brand-700 animation-blur sm:hover:-translate-y-1 transition-transform duration-300 text-sm flex items-center justify-center gap-2 min-h-10"
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="rounded-lg py-2 px-3 bg-brand-50 dark:bg-brand-700 animation-blur sm:hover:-translate-y-1 transition-transform duration-300 text-sm flex items-center justify-center gap-2 cursor-pointer min-h-10"
        >
          {children}
        </button>
      )}
    </>
  );
}
