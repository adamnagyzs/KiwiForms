import { authenticatedRoutePaths } from "@/config/router-paths";
import * as React from "react";
import { Navigate, useLocation, matchPath } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { authenticatedRedirectMap } from "@/config/redirect-maps";

type GuestGuardProps = {
  children?: React.ReactNode;
};

function GuestGuard({ children }: GuestGuardProps) {
  const { session, isIdle, isLoading } = useAuth();
  const location = useLocation();

  if (isIdle || isLoading) {
    return <LoadingScreen />;
  }

  if (session) {
    for (const [pattern, getRedirectPath] of Object.entries(
      authenticatedRedirectMap,
    )) {
      const match = matchPath({ path: pattern, end: true }, location.pathname);
      if (match) {
        return <Navigate to={getRedirectPath(match.params)} replace />;
      }
    }

    return <Navigate to={authenticatedRoutePaths.root} replace />;
  }
  return <>{children}</>;
}

export { GuestGuard };
