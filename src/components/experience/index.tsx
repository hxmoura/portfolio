import animationBlur from "@/utils/animationBlur";

type ExperienceProps = {
  title: string;
  description: string;
  date: string;
  animationBlurLevel?: number;
};

export default function Experience({
  title,
  description,
  date,
  animationBlurLevel,
}: ExperienceProps) {
  return (
    <article
      className={`flex flex-col sm:flex-row gap-1 sm:gap-5 ${
        animationBlurLevel && animationBlur(animationBlurLevel)
      }`}
    >
      <p className="min-w-fit text-brand-500 dark:text-brand-300">{date}</p>
      <div className="space-y-3">
        <h5 className="font-semibold">{title}</h5>
        <p className="text-brand-500 dark:text-brand-300">{description}</p>
      </div>
    </article>
  );
}
