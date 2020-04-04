import * as React from "react";
import firebase, { uiConfig } from "../services/firebase";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default function() {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
}
