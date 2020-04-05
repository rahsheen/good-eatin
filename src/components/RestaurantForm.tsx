import { useForm } from "react-hook-form";
import { useUser } from "../context/user-context";
import {
  useToast,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
} from "@chakra-ui/core";
import React from "react";
import { saveRestaurant } from "../utils/api";

function RestaurantForm({ restaurant: { name, description }, onDone }: any) {
  const { handleSubmit, errors, register, formState } = useForm({
    defaultValues: {
      name,
      description,
    },
  });
  const toast = useToast();
  const user = useUser();

  function onSubmit(values: any) {
    saveRestaurant(user!.uid, values)
      .then(() => {
        toast({
          title: "Restaurant updated.",
          description: "We've updated your restaurant.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onDone();
      })
      .catch((e) => console.log(e));
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
            type="submit"
          >
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

export { RestaurantForm };
