import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
}

export { UserLayout };
