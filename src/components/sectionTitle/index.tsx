import animationBlur from "@/utils/animationBlur";

type SectionTitleProps = {
  children: React.ReactNode;
  animationBlurLevel?: number;
};

export default function SectionTitle({
  children,
  animationBlurLevel,
}: SectionTitleProps) {
  return (
    <h4
      className={`font-semibold text-lg mb-7 ${
        animationBlurLevel && animationBlur(animationBlurLevel)
      }`}
    >
      {children}
    </h4>
  );
}
