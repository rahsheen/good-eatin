import React from "react";
import "./App.css";
import { useUser } from "./context/user-context";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./routes";

function App() {
  const user = useUser();

  return user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
}

export default App;
