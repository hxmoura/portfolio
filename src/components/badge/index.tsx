type BadgeProps = {
  children: React.ReactNode;
};

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="rounded-lg px-2 py-3 bg-brand-50 dark:bg-brand-700 text-sm animation-blur">
      {children}
    </span>
  );
}
