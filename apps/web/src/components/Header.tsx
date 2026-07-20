import { authenticatedRoutePaths } from "@/config/router-paths";
import supabase from "@/libs/supabase";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="flex h-12 w-full items-center justify-between rounded-xl bg-teal-600 px-2">
      <div className="flex gap-2">
        <button
          onClick={() => navigate(authenticatedRoutePaths.createForm)}
          className="rounded-md bg-teal-700 p-1.5 text-white cursor-pointer hover:text-teal-200"
        >
          Create form
        </button>

        <button
          onClick={() => navigate(authenticatedRoutePaths.root)}
          className="rounded-md bg-teal-700 p-1.5 text-white cursor-pointer hover:text-teal-200"
        >
          Home
        </button>
      </div>

      <div className="flex gap-2">
        <button className="rounded-md bg-teal-700 p-1.5 text-white cursor-pointer hover:text-teal-200">
          Settings
        </button>

        <button
          onClick={logout}
          className="rounded-md bg-teal-700 p-1.5 text-white cursor-pointer hover:text-teal-200"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
