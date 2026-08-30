import { unauthenticatedRoutePaths } from "@/config/router-paths";
import * as React from "react";
import { Navigate, useLocation, matchPath } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { unauthenticatedRedirectMap } from "@/config/redirect-maps";

type AuthGuardProps = {
  children?: React.ReactNode;
};

function AuthGuard({ children }: AuthGuardProps) {
  const { session, isIdle, isLoading } = useAuth();
  const location = useLocation();

  if (isIdle || isLoading) {
    return <LoadingScreen />;
  }

  if (!session) {
    for (const [pattern, getRedirectPath] of Object.entries(
      unauthenticatedRedirectMap,
    )) {
      const match = matchPath({ path: pattern, end: true }, location.pathname);
      if (match) {
        return <Navigate to={getRedirectPath(match.params)} replace />;
      }
    }
    return <Navigate to={unauthenticatedRoutePaths.signIn} replace />;
  }

  return <>{children}</>;
}

export { AuthGuard };
