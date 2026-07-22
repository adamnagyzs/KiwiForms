import type { TextareaHTMLAttributes } from "react";
import ErrorMessage from "./ErrorMessage";

type TextareaProps = {
  label: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
  label,
  error,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-teal-50">
        {label}
      </label>

      <textarea
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
