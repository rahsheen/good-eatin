import * as React from "react";
import {
  ThemeProvider as ChakraProvider,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";
import { AuthProvider } from "./auth-context";
import { UserProvider } from "./user-context";

interface AppProps {
  children: React.ReactNode;
}

function AppProviders({ children }: AppProps) {
  return (
    <ChakraProvider>
      <ColorModeProvider>
        <CSSReset />
        <AuthProvider>
          <UserProvider>{children}</UserProvider>
        </AuthProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default AppProviders;
