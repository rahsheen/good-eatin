import React from "react";
import "./App.css";
import { useUser } from "./context/user-context";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./routes";
import { Flex } from "@chakra-ui/core";

function App() {
  const user = useUser();

  return (
    <Flex direction="column" justify="center" align="center">
      {user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
    </Flex>
  );
}

export default App;
