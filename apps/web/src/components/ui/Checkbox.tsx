import type { InputHTMLAttributes } from "react";
import ErrorMessage from "./ErrorMessage";

type CheckboxProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox({
  label,
  error,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-teal-50">
        <input
          {...props}
          type="checkbox"
          className={`
            h-4 w-4 rounded border-gray-300 text-teal-600 
            focus:ring-2 focus:ring-teal-300
            ${className}
          `}
        />

        {label}
      </label>

      <ErrorMessage message={error} />
    </div>
  );
}
