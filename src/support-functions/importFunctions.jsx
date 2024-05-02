import { useEffect } from "react";
import { collection, getDocs, onSnapshot } from "@firebase/firestore";

export const useFetchCollection = (collectionRef, setData) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef);
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ref: doc.ref, data: doc.data() });
        });
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
};

// try {
//   await updateDoc(docRef, { [fieldName]: newValue });
// } catch (error) {
//   if (error.code === "not-found") {
//     await setDoc(docRef, { [fieldName]: newValue });
//   }
// }
export const useFetchRealtimeCollection = (ref, setData) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ref: doc.ref, data: doc.data() });
      });
      setData(fetchedData);
    });
    return () => unsubscribe();
  }, []);
};

export const useFetchRealtimeDoc = (ref, setData) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(ref, (doc) => {
      if (doc.exists) {
        const fetchedData = doc.data();
        setData(fetchedData);
      } else {
        console.log("failed to load doc");
      }
    });
    return () => unsubscribe();
  }, []);
};

// Not usable in current state.
export const useFetchNestedCollection = (docRef, collectionName, setData) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists) {
        let fetchedData = doc;

        fetchedData = collection(doc.ref, { collectionName });

        setData(fetchedData);
      } else {
        setData("failed to load");
      }
    });
    return () => unsubscribe();
  }, []);
};

export default useFetchRealtimeCollection;

// const [contacts, setContacts] = useState({});

// useFetchRealtimeDoc (
//   doc(firestore, `accounts/${location}/users/${userID}/matchmaking/contacts`),
//   setContacts
// );

// const [contact, setContact] = useState({});
// useEffect(() => {
//   if (contacts && contacts[userID]) {
//     const unsubscribe = onSnapshot(contacts["sean"], (doc) => {
//       if (doc.exists) {
//         const fetchedData = doc.data();
//         setContact(fetchedData);
//       } else {
//         console.log("failed to load doc");
//       }
//     });
//     return () => unsubscribe();
//   }
// }, [contacts]);
