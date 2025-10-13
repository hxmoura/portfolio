type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}
