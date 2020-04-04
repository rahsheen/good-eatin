import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
  Flex
} from "@chakra-ui/core";
import "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../context/user-context";
import firebase from "../services/firebase";

function RestaurantForm() {
  return (
    <Flex bg="blue.50" direction="column" justify="space-around" align="center">
      <FormControl>
        <FormLabel htmlFor="name">Restaurant Name</FormLabel>
        <Input type="text" id="name" aria-describedby="name-helper-text" />
        <FormHelperText id="name-helper-text">
          We'll always spam your name.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description">Restaurant Description</FormLabel>
        <Input
          type="text"
          id="description"
          aria-describedby="description-helper-text"
        />
        <FormHelperText id="description-helper-text">
          Tell us about your restaurant.
        </FormHelperText>
      </FormControl>
    </Flex>
  );
}

function CreateModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Create One?</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Restaurant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RestaurantForm />
          </ModalBody>

          <ModalFooter>
            <Button rightIcon="arrow-forward" variant="ghost" onClick={save}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [restaurant, setRestaurant] = useState<
    firebase.firestore.DocumentData
  >();
  const user = useUser();
  const db = useRef(
    firebase
      .firestore()
      .collection("restaurants")
      .doc(user!.uid)
  );

  useEffect(() => {
    db.current
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setRestaurant(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }, [user]);

  return (
    <Box flex="1">
      <header className="App-header">
        <Text>
          Edit <code>src/App.tsx</code> and save to reload.
        </Text>
        {restaurant ? (
          <Box>
            <Text>{restaurant.name}</Text>
          </Box>
        ) : (
          <Box>
            <Text>No Restaurant</Text>
            <CreateModal />
          </Box>
        )}
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
