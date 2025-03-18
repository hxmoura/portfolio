import { ChangeEvent } from "react";

type InputProps = {
  name?: string;
  value: string;
  onChange: (evt: ChangeEvent) => void;
  label?: string;
};

export default function Input({ value, name, onChange, label }: InputProps) {
  return (
    <div className="w-full">
      {label && <label htmlFor={name} className="mb-1 text-sm">{label}</label>}
      <input
        type="text"
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        className="py-2 px-3 bg-brand-50 dark:bg-brand-900 rounded-lg w-full"
      />
    </div>
  );
}
