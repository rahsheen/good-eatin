import * as React from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const MenuItems = ({ children }: { children: React.ReactNode }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = (props: any) => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow((prevShow) => !prevShow);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          Good Eatin'
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Docs</MenuItems>
        <MenuItems>Examples</MenuItems>
        <MenuItems>Blog</MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          bg="transparent"
          border="1px"
          onClick={() => user ? logout() : history.push("Login")}
        >
          {user ? "Sign Out" : "Create account"}
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
