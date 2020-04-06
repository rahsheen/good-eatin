import firebase from "../services/firebase";

const restaurantsRef = firebase.firestore().collection("restaurants");

export async function saveRestaurant(id: string, values: object) {
  if (!values) throw new Error("Must provide values");

  if(!id) return restaurantsRef.add({ ...values, id });

  return restaurantsRef.doc(id).update(values);
}

export async function getRestaurants(uid: string) {
  if (!uid) throw new Error("Must provide a uid");

  const snapshot = await restaurantsRef
    .where("uid", "==", uid)
    .get();

  const arr: any[] = [];
  snapshot.forEach(doc => {
    // doc.data() is never undefined for query doc snapshots
    arr.push({...doc.data(), id: doc.id});
  });
  console.log("Got restaurants", arr)
  return arr;
}
