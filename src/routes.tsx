import { Box, Button, Heading, Text } from "@chakra-ui/core";
import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import Login from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import Navbar from "./components/Navbar";

const Home = () => {
  const history = useHistory();

  return (
    <Box flex="1">
      <Heading>
        <Text>Home</Text>
      </Heading>
      <Button onClick={history.push("Login")}>Sign In</Button>
    </Box>
  );
};

const Register = () => <Text>Register</Text>;
const ForgotPassword = () => <Text>ForgotPassword</Text>;

const AuthenticatedRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

function UnauthenticatedRoutes() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
      </Switch>
    </Router>
  );
}

export { AuthenticatedRoutes, UnauthenticatedRoutes };
