import * as React from "react";
import { useAuth } from "./auth-context";

const UserContext = React.createContext<firebase.User | null | undefined>(undefined);

const UserProvider = (props: any) => {
  const { user } = useAuth();
  return <UserContext.Provider value={user} {...props} />;
};

const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
