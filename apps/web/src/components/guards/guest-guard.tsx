import { authenticatedRoutePaths } from "@/config/router-paths";
import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { LoadingScreen } from "@/components/ui/loading-screen";

type GuestGuardProps = {
  children?: React.ReactNode;
};

function GuestGuard({ children }: GuestGuardProps) {
  const { session, isIdle, isLoading } = useAuth();

  if (isIdle || isLoading) {
    return <LoadingScreen />;
  }

  if (session) {
    return <Navigate to={authenticatedRoutePaths.root} />;
  }

  return <>{children}</>;
}

export { GuestGuard };
