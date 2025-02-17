type SectionTitleProps = {
  children: React.ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
  return <h4 className="font-semibold text-lg mb-7">{children}</h4>;
}
