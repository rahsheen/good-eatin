import React from "react";
import "./App.css";
import AppProviders from "./context";
import { useUser } from "./context/user-context";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./routes";

const Main = () => {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
};

function App() {  
  const user = useUser();

  return user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
}

export default Main;
