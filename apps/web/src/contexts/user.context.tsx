import { createContext, useContext } from "react";
import { useAuth } from "@/hooks/use-auth";
import { DatabaseUser } from "@kiwiforms/types";
import { Session } from "@supabase/supabase-js";

type UserContextType = {
  session: Session;
  databaseUser: DatabaseUser;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export type UserProviderProps = {
  children?: React.ReactNode;
};

function UserProvider({ children }: UserProviderProps) {
  const { session, databaseUser, isLoading, isError, isSuccess } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !isSuccess) {
    return <div className="text-red-500">Error</div>;
  }

  const contextValue: UserContextType = {
    /**
     * After isLoading and isError checks we can safely assume that databaseUser is not null
     */
    session: session!,
    databaseUser: databaseUser!,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }

  return context;
}

export { UserProvider, useUser };
