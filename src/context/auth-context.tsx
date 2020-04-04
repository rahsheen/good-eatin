import "firebase/auth";
import React, { useEffect } from "react";
import firebase from "../services/firebase";
import { Spinner } from "@chakra-ui/core";

interface AuthContextType {
  user?: firebase.User | null;
  logout: () => Promise<void>;
  register?: () => Promise<void>;
}

const logout = () => firebase.auth().signOut();

const AuthContext = React.createContext<AuthContextType>({ logout });

function AuthProvider(props: any) {
  const [user, setUser] = React.useState<firebase.User | null>();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(setUser);

    return unregisterAuthObserver;
  }, []);
  // TODO: code for pre-loading the user's information if we have their token in
  // localStorage goes here
  // useEffect(() => {
  //   setData({});
  // }, []);

  // 🚨 this is the important bit.
  // Normally your provider components render the context provider with a value.
  // But we post-pone rendering any of the children until after we've determined
  // whether or not we have a user token and if we do, then we render a spinner
  // while we go retrieve that user's information.
  if (user === undefined) return <Spinner size="lg" />;

  const register = () => Promise.resolve();
  const authContextValue = { user, logout, register };

  return <AuthContext.Provider value={authContextValue} {...props} />;
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
