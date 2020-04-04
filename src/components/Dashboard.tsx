import { Box, IconButton, Text, useColorMode } from "@chakra-ui/core";
import React, { useEffect } from "react";
import { useUser } from "../context/user-context";

const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useUser();
  
  useEffect(() => {
      console.log('Fetch firestore')
  }, [user])

  return (
    <Box flex="1">
      <header className="App-header">
        <Text>
          Edit <code>src/App.tsx</code> and save to reload.
        </Text>
        <IconButton
          aria-label="Toggle Color Mode"
          icon={colorMode === "light" ? "moon" : "sun"}
          onClick={toggleColorMode}
        />
      </header>
    </Box>
  );
};

export { Dashboard };
