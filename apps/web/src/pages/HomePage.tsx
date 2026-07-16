import supabase from "@/libs/supabase";

export default function HomePage() {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <button
      onClick={logout}
      className="w-full px-4 py-3 mt-6 font-bold text-white transition-colors bg-teal-800 rounded-md cursor-pointer hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-teal-600"
    >
      Sign Out
    </button>
  );
}
