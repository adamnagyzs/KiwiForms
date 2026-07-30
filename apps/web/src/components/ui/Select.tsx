import type { SelectHTMLAttributes } from "react";
import ErrorMessage from "./ErrorMessage";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  error?: string;
  options: ReadonlyArray<SelectOption>;
} & SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  label,
  error,
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-teal-50">
        {label}
      </label>

      <select
        {...props}
        className={`
          w-full px-4 py-2 text-gray-900 bg-white rounded-md outline-none transition
          ${
            error
              ? "border-2 border-red-400 focus:ring-2 focus:ring-red-300"
              : "border border-transparent focus:ring-2 focus:ring-teal-300"
          }
          ${className}
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ErrorMessage message={error} />
    </div>
  );
}
