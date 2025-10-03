"use client";

import { useTranslation } from "@/contexts/DictContext";
import { Icon } from "@iconify/react";
import stack from "../../content/data/tech.json";

type Props = {
  name?: keyof typeof stack;
  iconWidth?: number;
  iconHeight?: number;
};

export default function Technology({
  name,
  iconWidth = 16,
  iconHeight = 16,
}: Props) {
  const { lang } = useTranslation();

  const tech = Object.entries(name ? { [name]: stack[name] } : stack);

  return (
    <>
      {tech.map(([key, tech]) => {
        if (!tech) return null;

        return (
          <span
            key={key}
            className="relative rounded-full px-3 py-2.5 bg-brand-50/60 dark:bg-brand-700/40 animation-blur flex items-center gap-2 w-fit group"
          >
            <Icon icon={tech.icon} width={iconWidth} height={iconHeight} />

            <p className="text-xs font-semibold text-brand-700 dark:text-white">
              {tech.name}
            </p>

            <div className="absolute bottom-full -translate-y-2 right-0 translate-x-1/2 hidden lg:group-hover:block w-60 p-3 bg-brand-50 dark:bg-brand-800 rounded-xl z-50 overflow-hidden shadow-xl">
              <div className="relative">
                <div
                  className="absolute top-0 left-0 size-40 bg-radial to-transparent to-70% -z-30 opacity-12 dark:opacity-20"
                  style={{ ["--tw-gradient-from" as never]: tech.color }}
                />
                <div
                  className="absolute right-0 size-80 bg-radial to-transparent to-70% -z-30 opacity-12 dark:opacity-20"
                  style={{ ["--tw-gradient-from" as never]: tech.color }}
                />

                <div className="flex items-center gap-2 mb-2">
                  <Icon icon={tech.icon} width={16} height={16} />
                  <p className="text-xs font-semibold text-brand-700 dark:text-white">
                    {tech.name}
                  </p>
                </div>

                <p className="text-xs">
                  {lang === "en" ? tech.description.en : tech.description.pt}
                </p>
              </div>
            </div>
          </span>
        );
      })}
    </>
  );
}
