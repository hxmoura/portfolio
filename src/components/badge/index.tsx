import animationBlur from "@/utils/animationBlur";

type BadgeProps = {
  children: React.ReactNode;
  animationBlurLevel?: number;
};

export default function Badge({ children, animationBlurLevel }: BadgeProps) {
  return (
    <span
      className={`rounded-lg px-2 py-3 bg-brand-50 dark:bg-brand-700 text-sm ${
        animationBlurLevel && animationBlur(animationBlurLevel)
      }`}
    >
      {children}
    </span>
  );
}
