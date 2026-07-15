import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="flex items-center gap-1 mt-1 text-sm text-red-100 animate-in fade-in slide-in-from-top-1">
      <AlertCircle size={14} />
      {message}
    </p>
  );
}
