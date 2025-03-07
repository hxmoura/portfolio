type SectionTitleProps = {
  children: React.ReactNode;
};

export default function Title({ children }: SectionTitleProps) {
  return (
    <h4 className="font-semibold text-lg mb-7 animation-blur">{children}</h4>
  );
}
