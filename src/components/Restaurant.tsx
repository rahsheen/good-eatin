import { Box, IconButton, Text, useDisclosure } from "@chakra-ui/core";
import React from "react";
import { CreateModal } from "./RestaurantModal";

interface RestaurantProps {
  restaurant?: firebase.firestore.DocumentData;
}

export function Restaurant({ restaurant }: RestaurantProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {restaurant ? (
        <Box shadow="lg">
          <Text>{restaurant.description}</Text>
          <Text>{restaurant.name}</Text>
          <IconButton
            aria-label="Edit Restaurant"
            icon="edit"
            onClick={onOpen}
          />
        </Box>
      ) : (
        <Box>
          <Text>No Restaurant</Text>
        </Box>
      )}
      <CreateModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        restaurant={restaurant}
      />
    </>
  );
}
