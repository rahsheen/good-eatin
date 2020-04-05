import firebase from "../services/firebase";

export function saveRestaurant(uid: string, values: object) {
  return firebase.firestore().collection("restaurants").doc(uid).set(values);
}
