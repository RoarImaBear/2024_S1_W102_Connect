import { useEffect } from "react";
import { getDocs, onSnapshot } from "@firebase/firestore";

// Method for onetime fetching Firestore Collection, returning an array of contained docs
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

// Method for subscribing to a Firestore Collection in realtime, returning an array of contained docs
// and updating it as changes emerge.
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

// Method for subsctibing to a Firestore Doc, returning the doc object and updating as changes
// are made
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
export default useFetchRealtimeCollection;
