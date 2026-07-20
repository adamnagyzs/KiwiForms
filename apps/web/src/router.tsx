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
import HomePage from "./pages/HomePage";
import { UserProvider } from "./contexts/user.context";
import { CreateForm } from "./pages/CreateForm";

const router = createBrowserRouter(
  [
    {
      element: (
        <UserProvider>
          <RouteWrapper guard={AuthGuard} layout={UserLayout} />
        </UserProvider>
      ),
      children: [
        {
          path: authenticatedRoutePaths.root,
          element: <HomePage />,
        },
        { path: authenticatedRoutePaths.createForm, element: <CreateForm /> },
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
