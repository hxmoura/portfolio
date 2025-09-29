import { Icon } from "@iconify/react";

type BadgeProps = {
  icon: string;
  iconWidth?: number;
  iconHeight?: number;
  label: string;
  description: string;
  color: string;
};

export default function Badge({
  icon,
  iconWidth = 16,
  iconHeight = 16,
  label,
  description,
  color,
}: BadgeProps) {
  return (
    <span className="rounded-full px-3 py-2.5 bg-brand-50/60 dark:bg-brand-700/40 animation-blur flex items-center gap-2 w-fit group">
      <Icon icon={icon} width={iconWidth} height={iconHeight} />

      <p className="text-xs font-semibold text-brand-700 dark:text-white">
        {label}
      </p>

      <div className="absolute bottom-full -translate-y-2 right-0 translate-x-1/2 hidden lg:group-hover:block w-60 p-3 bg-brand-50 dark:bg-brand-800 rounded-xl z-50 overflow-hidden shadow-xl">
        <div className="relative">
          <div
            className={`absolute top-0 left-0 size-40 bg-radial to-transparent to-70% -z-30 opacity-12 dark:opacity-20`}
            style={{ ["--tw-gradient-from" as never]: color }}
          />
          <div
            className={`absolute right-0 size-80 bg-radial to-transparent to-70% -z-30 opacity-12 dark:opacity-20`}
            style={{ ["--tw-gradient-from" as never]: color }}
          />

          <div className="flex items-center gap-2 mb-2">
            <Icon icon={icon} width={16} height={16} />

            <p className="text-xs font-semibold text-brand-700 dark:text-white">
              {label}
            </p>
          </div>
          <p className="text-xs">{description}</p>
        </div>
      </div>
    </span>
  );
}
