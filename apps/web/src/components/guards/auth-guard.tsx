import { unauthenticatedRoutePaths } from "@/config/router-paths";
import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { LoadingScreen } from "@/components/ui/loading-screen";

type AuthGuardProps = {
  children?: React.ReactNode;
};

function AuthGuard({ children }: AuthGuardProps) {
  const { session, isIdle, isLoading } = useAuth();

  if (isIdle || isLoading) {
    return <LoadingScreen />;
  }

  if (!session) {
    return <Navigate to={unauthenticatedRoutePaths.signIn} />;
  }

  return <>{children}</>;
}

export { AuthGuard };
