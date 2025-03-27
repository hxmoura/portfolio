import { ChangeEvent } from "react";

type InputProps = {
  name?: string;
  value: string;
  onChange: (evt: ChangeEvent) => void;
  label?: string;
  multiline?: boolean;
};

export default function Input({
  value,
  name,
  onChange,
  label,
  multiline,
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="mb-1 text-sm font-semibold">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          id={name}
          value={value}
          name={name}
          onChange={onChange}
          className="py-2 px-3 bg-brand-50 dark:bg-brand-900 rounded-lg w-full min-h-32"
        />
      ) : (
        <input
          type="text"
          id={name}
          value={value}
          name={name}
          onChange={onChange}
          className="py-2 px-3 bg-brand-50 dark:bg-brand-900 rounded-lg w-full"
        />
      )}
    </div>
  );
}
