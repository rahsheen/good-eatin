import {
  Flex,
  Stack,
  PseudoBox,
  useColorMode,
  IconButton,
  Box,
  Image,
} from "@chakra-ui/core";
import React from "react";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.300", dark: "gray.600" };
  const textColor = { light: "black", dark: "gray.100" };
  const location = useLocation();
  console.log(location);

  return (
    <Flex
      w="100vw"
      bg={bgColor[colorMode]}
      align="center"
      color={textColor[colorMode]}
      justify="center"
      fontSize={["md", "lg", "xl", "xl"]}
      h="7vh"
      boxShadow="md"
      p={2}
    >
      <Flex w={["100vw", "100vw", "80vw", "80vw"]} justify="space-around">
        <Box>
          <Image h="4vh" src="./logo.svg" alt="Logo of Chakra-ui" />
        </Box>
        <Stack
          spacing={8}
          color={textColor[colorMode]}
          justify="center"
          align="center"
          isInline
        >
          <PseudoBox
            position="relative"
            opacity={location.pathname !== "/dashboard" ? 0.4 : 1}
          >
            <Link to="/dashboard">Dashboard</Link>
          </PseudoBox>
          <PseudoBox
            position="relative"
            opacity={location.pathname !== "/login" ? 0.4 : 1}
          >
            <Link to="/login">Login</Link>
          </PseudoBox>
          <PseudoBox
            position="relative"
            opacity={location.pathname !== "/register" ? 0.4 : 1}
          >
            <Link to="/register">Register</Link>
          </PseudoBox>
          <PseudoBox
            position="relative"
            opacity={location.pathname !== "/list" ? 0.4 : 1}
          >
            <Link to="/list">List</Link>
          </PseudoBox>
        </Stack>
        <Box>
          <IconButton
            rounded="full"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? "moon" : "sun"}
            aria-label="dark mode setting"
          >
            Change Color Mode
          </IconButton>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
