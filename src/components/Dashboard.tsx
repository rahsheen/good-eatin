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
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
  Flex,
  FormErrorMessage
} from "@chakra-ui/core";
import "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/user-context";
import firebase from "../services/firebase";
import { useForm } from "react-hook-form";

function RestaurantForm({ restaurant: { name, description }, onDone }: any) {
  const { handleSubmit, errors, register, formState } = useForm({
    defaultValues: {
      name,
      description
    }
  });
  const user = useUser();

  function onSubmit(values: any) {
    firebase
      .firestore()
      .collection("restaurants")
      .doc(user!.uid)
      .set(values)
      .then(onDone)
      .catch(e => console.log(e));
  }

  return (
    <Flex direction="column" justify="space-around" align="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel htmlFor="name">Restaurant Name</FormLabel>
          <Input
            ref={register}
            type="text"
            name="name"
            aria-describedby="name-helper-text"
          />
          <FormHelperText id="name-helper-text">
            We'll always spam your name.
          </FormHelperText>
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Restaurant Description</FormLabel>
          <Input
            ref={register}
            type="text"
            name="description"
            aria-describedby="description-helper-text"
          />
          <FormHelperText id="description-helper-text">
            Tell us about your restaurant.
          </FormHelperText>
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <Flex direction="row-reverse" align="center">
          <Button
            isLoading={formState.isSubmitting}
            rightIcon="arrow-right"
            type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

function CreateModal({ restaurant, isOpen, onOpen, onClose }: any) {
  console.log("Rest", restaurant);
  return (
    <>
      <Button onClick={onOpen}>Create One?</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Restaurant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RestaurantForm onDone={onClose} restaurant={restaurant} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [restaurant, setRestaurant] = useState<
    firebase.firestore.DocumentData
  >();
  const user = useUser();

  useEffect(() => {
    firebase
      .firestore()
      .collection("restaurants")
      .doc(user!.uid)
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
        {restaurant ? (
          <Flex align="center">
            <Text>{restaurant.description}</Text>
            <Text>{restaurant.name}</Text>
            <IconButton
              aria-label="Edit Restaurant"
              icon="edit"
              variant="outline"
              onClick={onOpen}
            />
          </Flex>
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
