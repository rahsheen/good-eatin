import firebase from "../services/firebase";

const restaurantsRef = firebase.firestore().collection("restaurants");

export function saveRestaurant(uid: string, values: object) {
  if (!uid || !values) throw new Error("Must provide a uid and values");

  return restaurantsRef.add({ ...values, uid }).then(console.log);
}

export function getRestaurants(uid: string) {
  if (!uid) throw new Error("Must provide a uid");

  return restaurantsRef
    .where("uid", "==", uid)
    .get()
    .then(snapshot => {
      const arr: any[] = [];
      snapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
      });
      return arr;
    });
}
