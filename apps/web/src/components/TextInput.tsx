import type { InputHTMLAttributes } from "react";
import ErrorMessage from "./ErrorMessage";

type TextInputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({
  label,
  error,
  className = "",
  ...props
}: TextInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-teal-50">
        {label}
      </label>

      <input
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
      />

      <ErrorMessage message={error} />
    </div>
  );
}
