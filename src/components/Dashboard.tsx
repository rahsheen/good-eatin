import { Box } from "@chakra-ui/core";
import "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/user-context";
import { Restaurant } from "./Restaurant";
import { getRestaurants } from "../utils/api";

const Dashboard = () => {
  const [restaurant, setRestaurant] = useState<
    firebase.firestore.DocumentData
  >();
  const user = useUser();

  useEffect(() => {
    getRestaurants(user!.uid)
      .then(r => r && setRestaurant(r))
      .catch(error => {
        console.log("Error getting restaurant:", error);
      });
  }, [user]);

  return (
    <Box size="md">
      <Restaurant restaurant={restaurant} />
    </Box>
  );
};

export { Dashboard };
