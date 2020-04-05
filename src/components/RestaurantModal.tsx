import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/core";
import { RestaurantForm } from "./RestaurantForm";
import React from "react";

function CreateModal({ restaurant, isOpen, onOpen, onClose }: any) {
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

  export { CreateModal }