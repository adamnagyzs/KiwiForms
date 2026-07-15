import { Outlet } from "react-router-dom";

function GuestLayout() {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
}

export { GuestLayout };
