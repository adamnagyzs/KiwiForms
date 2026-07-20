import { Outlet } from "react-router-dom";
import Header from "../Header";

function UserLayout() {
  return (
    <div className="bg-slate-400/80 min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

export { UserLayout };
