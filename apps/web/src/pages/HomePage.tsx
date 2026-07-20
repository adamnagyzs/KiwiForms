import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { unauthenticatedRoutePaths } from "@/config/router-paths";

export default function HomePage() {
  const navigate = useNavigate();

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      navigate(unauthenticatedRoutePaths.signIn, {
        replace: true,
      });
    },
  });

  return (
    <button
      onClick={() => signOut()}
      disabled={isPending}
      className="w-full px-4 py-3 mt-6 font-bold text-white transition-colors bg-teal-800 rounded-md cursor-pointer hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-teal-600"
    >
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  );
}
