import { Box, IconButton, useColorMode } from "@chakra-ui/core";
import "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/user-context";
import firebase from "../services/firebase";
import { Restaurant } from "./Restaurant";

const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setRestaurant(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [user]);

  return (
    <Box size="md">
      <Restaurant restaurant={restaurant} />
    </Box>
  );
};

export { Dashboard };
