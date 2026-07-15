import { createBrowserRouter, Navigate } from "react-router-dom";
import { RouteWrapper } from "@/components/RouteWrapper";
import {
  authenticatedRoutePaths,
  unauthenticatedRoutePaths,
} from "./config/router-paths";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { GuestGuard } from "./components/guards/guest-guard";
import { AuthGuard } from "./components/guards/auth-guard";
import { UserLayout } from "./components/layouts/user.layout";
import { GuestLayout } from "./components/layouts/guest.layout";

const router = createBrowserRouter(
  [
    {
      path: authenticatedRoutePaths.root,
      element: <RouteWrapper guard={AuthGuard} layout={UserLayout} />,
      children: [
        { path: authenticatedRoutePaths.root, element: <p>Home...</p> },
      ],
    },
    {
      element: <RouteWrapper guard={GuestGuard} layout={GuestLayout} />,
      children: [
        { path: unauthenticatedRoutePaths.signIn, element: <LoginForm /> },
        { path: unauthenticatedRoutePaths.signUp, element: <SignupForm /> },
      ],
    },
    {
      path: "/",
      element: <Navigate to={unauthenticatedRoutePaths.signIn} replace />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);

export { router };
