import { Outlet } from "react-router-dom";
import Header from "../common/Header";

function GuestLayout() {
  return (
    <div className="bg-slate-400/80 min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

export { GuestLayout };
