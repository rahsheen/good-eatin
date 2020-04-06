import { Box, useDisclosure } from "@chakra-ui/core";
import "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "../context/user-context";
import { Restaurant } from "./Restaurant";
import { getRestaurants } from "../utils/api";
import { CreateModal } from "./RestaurantModal";

const Dashboard = () => {
  const [restaurants, setRestaurants] = useState<
    firebase.firestore.DocumentData
  >([]);
  const user = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log("Getting restaurants");
    getRestaurants(user!.uid)
      .then((r) => r && setRestaurants(r))
      .catch((error) => {
        console.log("Error getting restaurant:", error);
      });
  }, [user, isOpen]);

  const onEdit = (restaurant: any) => {
    setRestaurants((prev) =>
      prev.map((r: any) => (r.id === restaurant.id ? restaurant : r))
    );
  };

  return (
    <>
      <Box size="md">
        {restaurants.map((restaurant: any) => (
          <Restaurant
            key={restaurant.id}
            restaurant={restaurant}
            onEdit={onEdit}
          />
        ))}
      </Box>
      <CreateModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export { Dashboard };
